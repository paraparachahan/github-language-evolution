type GitHubRepository = {
    name: string;
    language: string | null;
};

const username = "paraparachahan";
const url = `https://api.github.com/users/${username}/repos`;

const response = await fetch(url);

if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
}

const repositories = (await response.json()) as GitHubRepository[];

for (const repository of repositories) {
    const language = repository.language ?? "Unknown";
    console.log(`${repository.name}: ${language}`);
}
