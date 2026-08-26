type GitHubRepository = {
    name: string;
    language: string | null;
};

const username = "paraparachahan";
const url = `https://api.github.com/users/${username}/repos`;

const response = await fetch(url);
const repositories = (await response.json()) as GitHubRepository[];

for (const repository of repositories) {
    const language = repository.language ?? "Unknown";
    console.log(`${repository.name}: ${language}`);
}
