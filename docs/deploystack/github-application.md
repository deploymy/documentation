---
description: Keep Docker configurations and deployment templates in sync with DeployStack's GitHub App. Updates templates automatically when files change.
---

# GitHub App Integration

The DeployStack GitHub App ensures your Infrastructure as Code (IaC) templates remain synchronized with your Docker configurations. After submitting your repository to deploystack.io, install our GitHub App to enable automatic updates.

## How It Works

When you install the [DeployStack Repository Sync](https://github.com/apps/deploystack-repository-sync){:target="_blank"} app, it monitors specific files in your repository:

- `.deploystack/` directory - [Contains your Docker configurations and assets](/docs/deploystack/deploystack-configuration-directory.md)
- `README.md` - For README.md updates

When changes are detected in these files, the app automatically triggers an update of your IaC templates in our [deploy-templates](https://github.com/deploystackio/deploy-templates){:target="_blank"} repository.

::content-alert{type="important"}
Changes are only processed when they occur on your repository's **default branch**. Modifications in other branches will not trigger template, logo, config or any other updates.
::

## Installation

1. Visit the [installation page](https://github.com/apps/deploystack-repository-sync/installations/new){:target="_blank"}
2. Select the repositories you want to monitor
3. Approve the requested permissions

## Security & Permissions

The app follows the principle of least privilege and requires only:

- Read access to repository contents
- Read access to repository metadata

These minimal permissions ensure the app can only:

- Monitor changes to your Docker configurations
- Access basic repository information needed for template generation

## What Gets Updated?

When the app detects changes, it automatically updates:

- Infrastructure as Code templates for all supported cloud providers
- One-click deployment configurations
- Repository metadata in our catalog (description, topics)

## Managing the Integration

You can manage or remove the integration at any time through your [GitHub Applications Settings](https://github.com/settings/installations){:target="_blank"}. The app installation can be configured for specific repositories or your entire organization.

## Next Steps

After installing the app:

1. Make changes to your Docker configurations in the `.deploystack` directory
2. Commit and push your changes
3. DeployStack will automatically update your deployment templates

For details about the `.deploystack` directory structure, check our [.deploystack Directory Reference](/docs/deploystack/deploystack-configuration-directory.md).
