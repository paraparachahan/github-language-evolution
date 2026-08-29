type GitHubRepository = {
    name: string;
    language: string | null;
    fork: boolean;
};

async function fetchRepositories(
    username: string,
    perPage: number,
): Promise<GitHubRepository[]> {
    const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
    }

    const repositories = (await response.json()) as GitHubRepository[];

    return repositories;
}

const username = "paraparachahan";
const perPage = 100;

const repositories = await fetchRepositories(username, perPage);

const ownRepositories = repositories.filter(
    repository => !repository.fork
);

const excludedForkCount = repositories.length - ownRepositories.length;

console.log(`Public repositories: ${repositories.length}`);
console.log(`Analyzed repositories: ${ownRepositories.length}`);
console.log(`Excluded forks: ${excludedForkCount}`);

for (const repository of ownRepositories) {
    const language = repository.language ?? "Unknown";
    console.log(`${repository.name}: ${language}`);
}
