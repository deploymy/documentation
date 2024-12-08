---
description: Start deploying Docker applications across cloud providers with DeployStack. Step-by-step guide to generating infrastructure templates from Docker configurations.
---

# Getting Started with DeployStack

Let's get your Docker project deployed across different cloud platforms with minimal effort.

## What is DeployStack?

DeployStack transforms your Docker configurations into cloud-ready infrastructure templates. Whether you're using Docker run commands or docker-compose.yml files, we help make your project easily deployable by others.

What makes it powerful is the one-click deployment feature - your users can deploy your project instantly on their preferred cloud platform using the provider's native deployment capabilities.

## Project Requirements

### Repository Requirements

- A public GitHub repository (private repositories aren't supported yet)
- Either a docker-compose.yml file or documented Docker run commands
- Container images must be pre-built and available in a supported registry

### Container Requirements

For docker-compose.yml:

- Must use the `image` directive (no build instructions)
- Images must be from supported registries
- No private images currently supported

For Docker run commands:

- Must be complete, runnable commands
- Can include standard Docker options (ports, volumes, environment variables)
- Images must be publicly accessible

## Generating Your First Templates

1. Visit [deploystack.io/submit](https://deploystack.io/submit)
2. Submit your GitHub repository URL
3. We'll detect your Docker configurations and generate infrastructure templates
4. Your project gets added to our catalog at [deploystack.io/c](https://deploystack.io/c)

We support multiple cloud providers including AWS CloudFormation, DigitalOcean, and Render.com. See our complete list of supported providers in the [docker-to-iac documentation](/docs/docker-to-iac/index.md).

## Configuration Examples

### Using docker-compose.yml

```yaml
version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
  cache:
    image: redis:latest
    ports:
      - "6379:6379"
```

### Using Docker Run Commands

```bash
# Web Server
docker run -d \
  -p 80:80 \
  --name web \
  nginx:alpine

# Cache Server
docker run -d \
  -p 6379:6379 \
  --name cache \
  redis:latest
```

Both configurations will be translated into appropriate infrastructure templates for your chosen cloud providers.

## Adding Deployment Buttons

After template generation:

1. Visit [deploystack.io/deploy-button](https://deploystack.io/deploy-button)
2. Generate deployment button code
3. Add the buttons to your README.md

Users can then deploy your project with a single click on their preferred cloud platform.

## Next Steps

1. Review the [Configuration Requirements](/docs/deploystack/docker-compose-requirements.md)
2. Learn about [One-Click Deploy](/docs/deploystack/one-click-deploy.md)
3. Check [Supported Registries](/docs/docker-to-iac/supported-registries.md)

## Best Practices

- Store configuration files in your repository's root directory
- Use specific version tags for images rather than `latest`
- Ensure all images are publicly accessible
- Test configurations locally before submitting
- Document any specific requirements or environment variables

## Need Help?

- Review our [Troubleshooting Guide](/docs/deploystack/troubleshooting.md)
- Join our [Discord Community](https://discord.gg/UjFWwByB)

## Limitations

- Only supports public repositories currently
- Requires pre-built container images
- No support for private image registries
- Build instructions not supported (use pre-built images)
