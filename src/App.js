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
                    <li key={issue.id} className="stack--sm">
                      <h3>{issue.title}</h3>
                      <p
                        dangerouslySetInnerHTML={{ __html: md(issue.body) }}
                        className="stack--sm"
                      />
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

const mock = [
  {
    name: "expelliarmus",
    issues: [
      {
        title: "Beautiful project",
        body:
          "Hi folks! Some compliments...\r\n\r\n- You met all of your user stories and one of your stretch goals!\r\n- You used async/await to great effect!\r\n- You achieved two way data flow in React!\r\n- Really nice piecewise construction of the game based on whether the game is over or not!\r\n- Lots of components that all fit together nicely!\r\n- Great documentation of data flow in the readme!\r\n\r\n![](https://media.giphy.com/media/amrNGnZUeWhZC/giphy.gif)",
        id: 551333991,
        author: {
          name: "svnmmrs",
          avatar: "https://avatars1.githubusercontent.com/u/29084012?v=4"
        }
      }
    ]
  },
  {
    name: "week6-week7-FHIN-got-db-auth",
    issues: [
      {
        title: "Making Arya proud!",
        body:
          "Great to see your use of Arya labels and has contributed to a 100 accessibility score. Well done! \r\n\r\n![ ](https://media.giphy.com/media/2wYYlHuEw1UcsJYgAA/giphy.gif)",
        id: 537411635,
        author: {
          name: "Albadylic",
          avatar: "https://avatars0.githubusercontent.com/u/43413852?v=4"
        }
      },
      {
        title: "dataStreamer",
        body:
          "It's cool to see you have modularised this functionality and are using it as a function within your handlers! :mortar_board: :star2: \r\n\r\nIn terms of architecture, this could sit in a separate file of helper functions. ",
        id: 537409524,
        author: {
          name: "Albadylic",
          avatar: "https://avatars0.githubusercontent.com/u/43413852?v=4"
        }
      },
      {
        title: "Good understanding of Dependencies",
        body:
          "You seem to have got the grasp of the difference between a dependency and a dev dependency! Well done :medal_sports: \r\n\r\nIt took me a long time to get my head around the difference so you're certainly ahead of the game. \r\n\r\n![ ](https://media.giphy.com/media/11Ph1yb20GoOOY/giphy.gif)",
        id: 537164936,
        author: {
          name: "Albadylic",
          avatar: "https://avatars0.githubusercontent.com/u/43413852?v=4"
        }
      }
    ]
  }
];

export default App;
