---
description: Learn about multi-service deployment support - See how docker-to-iac handles multiple services in your container configurations.
---

# Multi-Service Support

Multi-service support refers to the ability of a [parser](/docs/docker-to-iac/parser-explanation.md) to handle multiple container configurations when translating to Infrastructure as Code (IaC) templates.

## Docker Run vs Docker Compose

### Docker Run Commands

By nature, Docker run commands define a single container. When you have multiple Docker run commands, each represents a separate service:

```bash
# Service 1
docker run -d -p 8080:80 nginx:alpine

# Service 2
docker run -d -p 6379:6379 redis:latest
```

### Docker Compose

Docker Compose files can define multiple services within a single file:

```yaml [docker-compose.yml]
version: '3.2'

services:
  web:
    image: nginx:alpine
    ports:
      - '8080:80'

  cache:
    image: redis:latest
    ports:
      - '6379:6379'
```

## Parser Support for Multiple Services

The ability to deploy multiple services simultaneously varies by cloud provider:

### Full Multi-Service Support

Some cloud providers can deploy multiple containers as part of a single deployment. In these cases, docker-to-iac will translate all services to the target IaC template:

```javascript
// All services will be included in the translation
const translation = translate(dockerComposeContent, {
  source: 'compose',
  target: 'CFN'  // AWS CloudFormation supports multiple services
});
```

### Limited Service Support

Some providers don't support deploying multiple containers simultaneously. For these providers:

- For Docker Compose input: Only the first service from the file will be translated
- For Docker run commands: Each command must be translated separately

```javascript
// Only the first service will be translated
const translation = translate(dockerComposeContent, {
  source: 'compose',
  target: 'RND'  // Render.com currently supports single service deployments
});
```

## Provider-Specific Behavior

Before using a specific parser, check its multi-service capabilities in the [parser documentation](/docs/docker-to-iac/parser-explanation.md). This helps ensure your deployment strategy aligns with the provider's capabilities.

Note that some providers may have different service limits or deployment patterns even when they support multiple services. Always consult the target provider's documentation for specific limitations.
