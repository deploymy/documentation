# Publishing to NPM

We have created an organization @deploymy for NPM. Publishing in NPM happens automatically through `semantic-release`. Config: [https://github.com/deploymy/docker-to-iac/blob/main/.github/workflows/release.yml](https://github.com/deploymy/docker-to-iac/blob/main/.github/workflows/release.yml)

The prerequisite for a release is a successful pull request to the default branch `main`. This means that all tests must first be successfully completed. `semantic-release` creates a new version and automatically publishes the node package to: [https://www.npmjs.com/package/@deploymy/docker-to-iac](https://www.npmjs.com/package/@deploymy/docker-to-iac)

Semantic-Release docs: [https://semantic-release.gitbook.io/semantic-release](https://semantic-release.gitbook.io/semantic-release)
