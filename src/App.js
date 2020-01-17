import React from "react";
import md from "snarkdown";
import { getIssues } from "./api";

function App() {
  const [data, setData] = React.useState({
    status: "initial",
    repos: [],
    error: ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    setData({ status: "loading", repos: [] });
    const username = event.target.elements.username.value;
    const label = event.target.elements.label.value;

    getIssues(username, label)
      .then(repos => {
        if (!repos.length) {
          setData({
            status: "error",
            error: "No matching issues found, sorry",
            repos: []
          });
        } else {
          setData({ status: "success", repos });
        }
      })
      .catch(error => {
        setData({
          status: "error",
          error: "We had a problem talking to Github, sorry",
          repos: []
        });
      });
  }

  const { status, repos, error } = data;
  return (
    <>
      <header>
        <h1 className="site-title">
          Complimentron{" "}
          <span role="img" aria-hidden="true">
            🤖
          </span>
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="e.g. redahaq"
            autoFocus
            required
          />
          <label htmlFor="label">Label</label>
          <input id="label" name="label" defaultValue="compliment" />
          <button type="submit" className="vh">
            Search
          </button>
        </form>
      </header>
      <main>
        {status === "initial" && (
          <div className="big">
            Enter your username to find compliments!{" "}
            <span role="img" aria-hidden="true">
              ➚
            </span>
          </div>
        )}
        {status === "error" && (
          <div className="big">
            {error}{" "}
            <span role="img" aria-hidden="true">
              😭
            </span>
          </div>
        )}
        {status === "loading" && (
          <span role="img" aria-label="loading" className="spin">
            ♥️
          </span>
        )}
        {status === "success" && (
          <ul className="stack--lg" style={{ paddingLeft: 0 }}>
            {repos.map(repo => (
              <li key={repo.name} className="stack--sm">
                <h2>{repo.name}</h2>
                <ul className="stack">
                  {repo.issues.map(issue => (
                    <li key={issue.id}>
                      <blockquote className="stack--sm">
                        <h3>{issue.title}</h3>
                        <p
                          dangerouslySetInnerHTML={{ __html: md(issue.body) }}
                          className="stack--sm"
                        />
                        <cite>
                          <img
                            src={issue.author.avatar}
                            alt=""
                            width="48"
                            height="48"
                          />
                          {issue.author.name}
                        </cite>
                      </blockquote>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

export default App;
