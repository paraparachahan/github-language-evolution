const username = "paraparachahan";
const url = `https://api.github.com/users/${username}/repos`;

const response = await fetch(url);
const repositories: unknown = await response.json();

console.log(repositories);