---
description: Start deploying Docker applications across cloud providers with DeployStack. Step-by-step guide to generating infrastructure templates and enabling one-click deployments.
---

# Getting Started with DeployStack

Let's get your Docker-based project up and running across different cloud platforms in no time.

## What's DeployStack, anyway?

You've built something cool with Docker, and now you want to make it super easy for others to deploy it. That's exactly what we help with! DeployStack turns your docker-compose.yml file into ready-to-use infrastructure templates for various cloud providers.

What makes it special is that your users can deploy your project with a single click, regardless of their preferred cloud platform. For this, we use the existing API or technology from the cloud provider for one-click deployment.

## Before You Jump In

You'll need:

- A public GitHub repository (private repos aren't supported yet)
- A docker-compose.yml file using pre-built images from Docker Hub
- No build option within docker-compose. DeployStack automation accepts only `Image` variable within docker-compose.

## Your First Template Generation

1. Go to [deploystack.io/submit](https://deploystack.io/submit)
2. Drop your GitHub repo URL into the submit box
3. Hit submit, After about 3 seconds, the IaC templates are generated, and you get the links. Your project is stored in our catalog at [deploystack.io/c](https://deploystack.io/c)

We'll scan your docker-compose.yml file and create infrastructure templates for AWS CloudFormation, DigitalOcean, and Render.com -> check the complete list here: [docker-to-iac parsers](/docs/docker-to-iac/parser.md). These templates go into our public template repository at [github.com/deploystackio/deploy-templates](https://github.com/deploystackio/deploy-templates).

## Making Life Easier for Your Users

Once we've generated your templates, you can use [deploystack.io/deploy-button](https://deploystack.io/deploy-button) page to create code for One-Click deploy buttons to be able to add it to your `README.md`.

Your users can click these buttons to deploy your project directly to their chosen cloud provider. No manual template copying or infrastructure setup needed.

## Quick Example

Let's say you have a simple web app with Redis:

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

Drop your repo URL into DeployStack, and we'll create all the infrastructure templates you need. Your users get a one-click solution to deploy this exact setup on their preferred cloud platform.

## What's Next?

- Check out [Docker Compose Requirements](./docker-compose-requirements.md) to understand what we can handle
- See how [One-Click Deploy](./one-click-deploy.md) works in the background

## Need Help?

Check our [Troubleshooting](./troubleshooting.md) guide. Still stuck? [Check our discord](https://discord.gg/UjFWwByB).

## Pro Tips

- Keep your docker-compose.yml in the root of your repository
- Make sure your Docker images are public on Docker Hub
- Test your docker-compose locally before submitting

Remember: DeployStack only handles pre-built images right now. If you're building custom images, you'll need to push them to Docker Hub first.

Happy deploying! 🚀
