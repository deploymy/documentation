---
description: Technical guide for setting up the .deploystack directory to manage Infrastructure as Code template generation and updates across your repository.
---

# .deploystack Directory Reference

The `.deploystack` directory in your repository contains configuration files that DeployStack uses to generate and maintain your Infrastructure as Code templates. Creating this repo allows you to enable the [lifecycle of IaC](/docs/deploystack/iac-lifecycle.md). The deploystack configurations repo only makes sense if you also [install DeployStack GitHub app](/docs/deploystack/github-application.md). Otherwise, changes to DeployStack backend will not be recognized.

::content-alert{type="note"}
`.deploystack` directory is optional. You don't need to create it to submit your repository to deploystack.io.
::

## Directory Structure

```bash
.deploystack/
├── docker-compose.yml  # Docker Compose configuration
├── docker-run.txt      # Docker run command
├── env                 # Environment variables (optional)
└── logo.webp           # Project / app logo (optional)
```

## Configuration Files

### Docker Configuration

Choose one of the following:

- `docker-compose.yml` - Standard Docker Compose configuration
- `docker-run.txt` - Single Docker run command

Example `docker-compose.yml`:

```yaml
version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
```

Example `docker-run.txt`:

```bash
docker run -d -p 80:80 nginx:alpine
```

### Environment Variables

- File: `env` (optional)
- Used with both Docker Compose and Docker run configurations
- Contains key-value pairs for environment variables

Example `env`:

```bash
DB_USER=admin
DB_PASSWORD=secretpassword
NGINX_PORT=80
```

### Repository Logo

- Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`
- Filename must be: `logo.<extension>`
- Image will be minified to:
  - Maximum width: 500px
  - Maximum height: 500px
- Automatically converted to WebP format for optimization

Your logo will be stored on our CDN and converted to `webp` format. Please note that we will minimize your logo to max width 500px and max height 500px if it is larger than 500px w and 500px h.

## Automatic Updates

When the [DeployStack GitHub App](/docs/deploystack/github-application.md) is installed:

1. Changes to specific (`docker-compose.yml` & `docker-run.txt`) file in `.deploystack/` trigger template updates
2. Updates only process when changes occur on the default branch
3. New templates are generated and stored in the [deploy-templates](https://github.com/deploystackio/deploy-templates){:target="_blank"} repository

## Important Notes

- The `.deploystack` directory is **optional**
- Without this directory, automatic template updates are **not** available
- You can add the directory and install the GitHub App at any time
- Environment variables and logo are optional components
- Only one Docker configuration file should be used (either compose or run)
