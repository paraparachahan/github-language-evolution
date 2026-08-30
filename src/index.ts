type GitHubRepository = {
    name: string;
    language: string | null;
    fork: boolean;
};

type GitHubCommit = {
    sha: string;
    commit: {
        message: string;
        author: {
            date: string;
        } | null;
    };
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

async function fetchCommits(
    username: string,
    repositoryName: string,
): Promise<GitHubCommit[]> {
    const url = `https://api.github.com/repos/${username}/${repositoryName}/commits`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
    }

    const commits = (await response.json()) as GitHubCommit[];

    return commits;
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

const repositoryName = "github-language-evolution";

const commits = await fetchCommits(username, repositoryName);

for (const commit of commits) {
    console.log(`${commit.sha}`);
    console.log(`${commit.commit.message}`);
    const authoredDate = commit.commit.author?.date ?? "Unknown date";
    console.log(authoredDate);
    console.log();
}
