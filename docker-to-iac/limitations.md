---
description: Current limitations and constraints of the docker-to-iac module
---

# Limitations

## Docker Image Requirement

The `docker-to-iac` module is designed to work exclusively with pre-built Docker images. This means that each service in your `docker-compose.yml` file must specify an `image` property.

### Build Instructions Not Supported

The module does not support services that use the `build` directive. For example:

```yaml
# ❌ Not Supported
services:
  app:
    build:
      context: ./build/app
      dockerfile: Dockerfile
```

Instead, you must use pre-built images:

```yaml
# ✅ Supported
services:
  app:
    image: nginx:latest
```

#### Rationale

This limitation exists because Infrastructure as Code (IaC) templates require specific, immutable container images to ensure consistent deployments. The infrastructure and the selection of cloud providers for this docker-to-iac module only allow pre-build container images. It is technically not possible to create a build with the preconfigured infrastructure. This is why the pre-build check was built in. This happens also because the scope of this module is only pre-build container.

### Workaround

If you need to use custom Docker images:

Build your Docker images locally or in your CI/CD pipeline
Push them to a container registry (like Docker Hub, GitHub Container Registry, or AWS ECR)
Reference the pushed image in your docker-compose file using the image property

For example:

```yaml
services:
  app:
    image: ghcr.io/your-org/your-app:1.0.0
```

This ensures that your IaC templates will have access to the exact same container image across all deployments.
