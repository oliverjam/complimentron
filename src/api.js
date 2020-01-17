const token = process.env.REACT_APP_GITHUB_TOKEN;

function get(url, data = []) {
  return fetch(url, { headers: { Authorization: token } }).then(res => {
    if (!res.ok) throw new Error(res.status);
    const link = res.headers.get("link");
    return res.json().then(json => {
      const newData = [...data, ...json];
      const nextPage = link
        ? link.match(/(?<=<)(.*?)(?=>; rel="next")/)
        : false;
      if (nextPage) {
        return get(nextPage[0], newData);
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
    if (!repo.open_issues_count) return;
    const url =
      repo.issues_url.replace("{/number}", "") +
      `?labels=${label}&access_token=${token}`;
    return get(url).then(issues => {
      return { name: repo.name, issues };
    });
    // GH urls have weird placeholders at the end?
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
          if (repo.name === "dish") {
            console.log(repo);
          }
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
