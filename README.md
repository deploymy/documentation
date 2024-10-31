# DeployStack Documentation

This repository serves as documentation for the entire DeployStack ecosystem.

If you would like to learn more, visit our website at [deploystack.io](https://deploystack.io).

![GitHub Release](https://img.shields.io/github/v/release/deploystackio/documentation)
![GitHub deployments](https://img.shields.io/github/deployments/deploystackio/documentation/docs-deploystack-io%20(Preview)?label=Preview%20Deployment)
![GitHub deployments](https://img.shields.io/github/deployments/deploystackio/documentation/docs-deploystack-io%20(Production)?label=Prod%20Deployment)

## How to contribute

We welcome contributions from the community! Please follow the guidelines below to participate in this project.

### Project Structure

The key directories and files in this repository include:

- `.github/` - Contains GitHub-related configurations and workflows.
- `.vitepress/` - VitePress configuration files.
- `public/` - Directory for storing static assets and public resources.
- `docker-to-iac/` - Directory containing specific documentation content.
- `index.md` - Entry point for the documentation main page.

If you want to create documentation on a specific topic other than docker-to-iac, you can create another directory in root dir level similar to `docker-to-iac`.

### Assets Management

Assets, such as images or other static files, should be stored in the `/public/` directory. When adding new assets, ensure that they are appropriately optimized for web delivery to improve load times and performance.

Ensure that all assets are referenced using relative paths in your markdown files to ensure proper linking.

For images, please when possible use `.webp` format.

If you want to create architectures or diagrams, please use [draw.io](https://draw.io/). You can use draw.io without creating an account. When exporting a diagram, make sure that it contains the draw.io content. This allows the diagram to be edited for future changes.

File -> Export as PNG -> Check Include a copy of my diagram (All Pages).

## CI/CD

Our CI/CD pipeline is designed to ensure smooth integration and deployment processes.

### GitHub Flow

1. **Feature Branches**: Start by creating a new feature branch from the `main` branch. Use descriptive names for feature branches like `feature/new-component` or `bugfix/issue-number`.
2. **Pull Requests**: Once your feature or fix is ready, open a pull request (PR) against the `main` branch. Ensure your PR is well-documented and includes any necessary context for reviewers.
3. **Merging**: After review, merge your PR into the `main` branch. The main branch deploys to preview environment of dosc.deploystack.io. The preview link is always added as a comment in a GitHub action job for preview env release.

To deploy to the production environment, the `main` branch needs to be merged into the `prod` branch. The `prod` branch deploys to [production environment - https://docs.deploystack.io](https://docs.deploystack.io).

### Semantic Release

We use Semantic Release to automatically manage versioning and package publishing. It is triggered upon a merged PR into the `main` branch. Following [conventional commits standards](https://semantic-release.gitbook.io/semantic-release#commit-message-format) ensures that semantic release can properly determine the next version number.

### Dependabot

Dependabot is activated to assist with dependency management:

- Automatic pull requests for security vulnerabilities.
- Weekly automated pull requests for npm module version upgrades.

Configuration details can be found [here](https://github.com/deploystackio/documentation/blob/main/.github/dependabot.yml).

---

We appreciate your contributions to the DeployStack documentation project. By following these guidelines, you help ensure that the documentation remains accurate, up-to-date, and beneficial to all users of the ecosystem.
