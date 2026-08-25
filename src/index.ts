type GitHubRepository = {
    name: string;
};

const username = "paraparachahan";
const url = `https://api.github.com/users/${username}/repos`;

const response = await fetch(url);
const repositories = (await response.json()) as GitHubRepository[];

for (const repository of repositories) {
    console.log(repository.name);
}
