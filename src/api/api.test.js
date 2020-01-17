import { getIssuesUrls } from "./api";

test("Get array of issues URLs from repo data", () => {
  const actual = getIssuesUrls(mockReposData);
  const expected = "https://api.github.com/repos/fac18/expelliarmus/issues";
  expect(Array.isArray(actual)).toBeTruthy();
  expect(actual[0]).toBe(expected);
});

const mockReposData = [
  {
    id: 234068102,
    issues_url:
      "https://api.github.com/repos/fac18/expelliarmus/issues{/number}",
    name: "expelliarmus",
    description: "A Harry Potter spellbinding game by Gillian and Reda",
    open_issues_count: 11
  },
  {
    id: 225037430,
    issues_url:
      "https://api.github.com/repos/fac18/fac18-projects-gallery/issues{/number}",
    name: "fac18-projects-gallery",
    description: "FAC18 Weekly Projects Gallery",
    open_issues_count: 0
  },
  {
    id: 218268542,
    issues_url:
      "https://api.github.com/repos/fac18/Jamie-and-Reda/issues{/number}",
    name: "Jamie-and-Reda",
    description: "Git workflow workshop",
    open_issues_count: 3
  },
  {
    id: 228829489,
    issues_url:
      "https://api.github.com/repos/fac18/week-8-AGIL/issues{/number}",
    name: "week-8-AGIL",
    description: "👨‍💻Welcome to the FAC 18 yearbook! Class of '19-'20 👩‍💻",
    open_issues_count: 9
  },
  {
    id: 218547005,
    issues_url:
      "https://api.github.com/repos/fac18/week1-BDIM-dynamyk-site/issues{/number}",
    name: "week1-BDIM-dynamyk-site",
    description: "week1-BDIM: Web development agency website",
    open_issues_count: 2
  },
  {
    id: 219990230,
    issues_url:
      "https://api.github.com/repos/fac18/week2-BDIM-fiasco/issues{/number}",
    name: "week2-BDIM-fiasco",
    description: "Add your to-dos here:",
    open_issues_count: 2
  },
  {
    id: 224445498,
    issues_url:
      "https://api.github.com/repos/fac18/week5-EIJO-weatherAPI/issues{/number}",
    name: "week5-EIJO-weatherAPI",
    description: "Get the weather for any city in the world.",
    open_issues_count: 4
  },
  {
    id: 225894473,
    issues_url:
      "https://api.github.com/repos/fac18/week6-week7-FHIN-got-db-auth/issues{/number}",
    name: "week6-week7-FHIN-got-db-auth",
    description: "A Game of Thrones team builder",
    open_issues_count: 16
  },
  {
    id: 217725217,
    issues_url:
      "https://api.github.com/repos/redahaq/calculator/issues{/number}",
    name: "calculator",
    description: "Vanilla Javascript Calculator",
    open_issues_count: 0
  },
  {
    id: 230781438,
    issues_url:
      "https://api.github.com/repos/redahaq/colour-grid/issues{/number}",
    name: "colour-grid",
    description: "A simple colour palette generator",
    open_issues_count: 0
  },
  {
    id: 225841671,
    issues_url:
      "https://api.github.com/repos/redahaq/db-remote-complexq/issues{/number}",
    name: "db-remote-complexq",
    description: "database-remote-db",
    open_issues_count: 0
  },
  {
    id: 202808360,
    issues_url:
      "https://api.github.com/repos/redahaq/hello-world/issues{/number}",
    name: "hello-world",
    description: "first repo",
    open_issues_count: 0
  },
  {
    id: 203474401,
    issues_url:
      "https://api.github.com/repos/redahaq/learn-co-sandbox/issues{/number}",
    name: "learn-co-sandbox",
    description: null,
    open_issues_count: 0
  },
  {
    id: 233574019,
    issues_url:
      "https://api.github.com/repos/redahaq/learn-react/issues{/number}",
    name: "learn-react",
    description: null,
    open_issues_count: 0
  },
  {
    id: 225359386,
    issues_url:
      "https://api.github.com/repos/redahaq/learn-sql/issues{/number}",
    name: "learn-sql",
    description: "Learn SQL with READMEs and code snippets",
    open_issues_count: 0
  },
  {
    id: 222463237,
    issues_url:
      "https://api.github.com/repos/redahaq/node-workshop/issues{/number}",
    name: "node-workshop",
    description: "Build a CMS in Node with no frameworks. ",
    open_issues_count: 0
  },
  {
    id: 226645541,
    issues_url:
      "https://api.github.com/repos/redahaq/portfolio/issues{/number}",
    name: "portfolio",
    description: null,
    open_issues_count: 0
  },
  {
    id: 203006088,
    issues_url:
      "https://api.github.com/repos/redahaq/redahaq.github.io/issues{/number}",
    name: "redahaq.github.io",
    description: "Reda's FAC application site",
    open_issues_count: 0
  },
  {
    id: 223820884,
    issues_url:
      "https://api.github.com/repos/redahaq/show-me-the-colours/issues{/number}",
    name: "show-me-the-colours",
    description: "A simple colour palette generator",
    open_issues_count: 0
  },
  {
    id: 222135026,
    issues_url:
      "https://api.github.com/repos/redahaq/week1-BDIM-dynamyk-site/issues{/number}",
    name: "week1-BDIM-dynamyk-site",
    description: "week1-BDIM: Web development agency website",
    open_issues_count: 0
  },
  {
    id: 222135095,
    issues_url:
      "https://api.github.com/repos/redahaq/week2-BDIM-fiasco/issues{/number}",
    name: "week2-BDIM-fiasco",
    description: "Add your to-dos here:",
    open_issues_count: 0
  },
  {
    id: 222135200,
    issues_url:
      "https://api.github.com/repos/redahaq/week3-cikp-gifsthesia/issues{/number}",
    name: "week3-cikp-gifsthesia",
    description: "Play our awesome song-lyrics-as-gifs guessing game! =>",
    open_issues_count: 0
  },
  {
    id: 224426662,
    issues_url:
      "https://api.github.com/repos/redahaq/week5-EIJO-weatherAPI/issues{/number}",
    name: "week5-EIJO-weatherAPI",
    description: "What is the weather where you're going? Find out...",
    open_issues_count: 0
  }
];
