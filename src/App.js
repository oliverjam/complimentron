import React from "react";
import md from "snarkdown";
import { getIssues } from "./api";

function updateState(state, event) {
  switch (event.type) {
    case "SUBMIT":
      return { ...state, status: "loading" };
    case "SUCCESS":
      return { ...state, status: "success", repos: event.repos };
    case "ERROR":
      return { ...state, status: "error", error: event.message };
    default:
      return {
        ...state,
        status: "error",
        error: `No state update matching ${event.type}`
      };
  }
}

function App() {
  const [state, dispatch] = React.useReducer(updateState, {
    status: "initial",
    repos: [],
    error: ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "SUBMIT" });
    const username = event.target.elements.username.value;
    const label = event.target.elements.label.value;

    getIssues(username, label)
      .then(repos => {
        if (!repos.length) {
          dispatch({
            type: "ERROR",
            message: "No matching issues found, sorry"
          });
        } else {
          dispatch({ type: "SUCCESS", repos });
        }
      })
      .catch(error => {
        dispatch({
          type: "ERROR",
          message: "We had a problem talking to Github, sorry"
        });
      });
  }

  const { status, repos, error } = state;
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
      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by <a href="https://oliverjam.es">@oliverjam</a>
        </p>
        <p>
          View source{" "}
          <a href="https://github.com/oliverjam/complimentron">on GitHub</a>
        </p>
      </footer>
    </>
  );
}

export default App;
