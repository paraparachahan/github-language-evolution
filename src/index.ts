type GitHubRepository = {
    name: string;
    language: string | null;
    fork: boolean;
};

const username = "paraparachahan";
const url = `https://api.github.com/users/${username}/repos`;

const response = await fetch(url);

if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
}

const repositories = (await response.json()) as GitHubRepository[];

const ownRepositories = repositories.filter(
    repository => !repository.fork
);

for (const repository of ownRepositories) {
    const language = repository.language ?? "Unknown";
    console.log(`${repository.name}: ${language}`);
}
