import { Octokit } from "@octokit/core";

const octokit = new Octokit({
    auth: "your_personal_access_token_here"
});

async function createIssue () {
    try {
        await octokit.request('POST /repos/StaytunedLAB/marjun-savaniya-2304030101562/issues', {
            owner: 'StaytunedLAB',
            repo: 'marjun-savaniya-2304030101562',
            title: 'issue created using javascript code',
            body: "issue created using javascript code using rest api key token.",
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        console.log("issue created");
    } catch (error) {
        console.error("Error creating issue:", error);
    }
}
createIssue();