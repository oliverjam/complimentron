const token = process.env.REACT_APP_GITHUB_TOKEN;

function parseLinkHeader(header) {
  let parsed = {};
  header
    .replace("Link: ", "")
    .split(",")
    .forEach(line => {
      const [linkString, relString] = line.split("; ");
      const link = linkString.replace(/<|>/g, "").trim();
      let [, rel] = relString.split("=");
      rel = rel.replace(/"/g, "");
      parsed[rel] = link;
    });
  return parsed;
}

function get(url, data = []) {
  return fetch(url, { headers: { Authorization: token } }).then(res => {
    if (!res.ok) throw new Error(res.status);
    const link = res.headers.get("link");
    return res.json().then(json => {
      const newData = [...data, ...json];
      const nextPage = link ? parseLinkHeader(link).next : false;
      if (nextPage) {
        return get(nextPage, newData);
      }
      return newData;
    });
  });
}

export function getRepos(username) {
  return get(
    `https://api.github.com/users/${username}/repos?type=all&sort=updated&per_page=100&access_token=${token}`
  );
  // type=all gets both repos you own and ones you're just a member of
}

export function getIssuesUrls(repos) {
  return repos.map(repo => repo.issues_url.replace("{/number}", ""));
  // GH urls have weird placeholders at the end?
}

function getIssuesForRepo(label) {
  return repo => {
    const url =
      // GH urls have weird placeholders at the end?
      repo.issues_url.replace("{/number}", "") +
      `?state=all&labels=${label}&access_token=${token}`;
    return get(url).then(issues => {
      return { name: repo.name, issues };
    });
  };
}

export function getIssues(username, label) {
  return getRepos(username)
    .then(repos => {
      const issuePromises = repos.map(getIssuesForRepo(label));
      return Promise.all(issuePromises);
    })
    .then(reposWithIssues => {
      const repos = reposWithIssues
        .filter(repo => {
          return repo && repo.issues.length > 0;
        })
        .map(repo => {
          const issues = repo.issues.map(issue => {
            return {
              title: issue.title,
              body: issue.body,
              id: issue.id,
              author: { name: issue.user.login, avatar: issue.user.avatar_url }
            };
          });
          return { name: repo.name, issues };
        });
      return repos;
    });
}
