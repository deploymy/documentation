---
description: Translate docker docker-compose.yml file into DigitalOcean Infrastructure as Code with DeployStack
---

# DigitalOcean - Parser Full Documentation

The parser for DigitalOcean translates the `docker-compose.yml` file into a DigitalOcean [App Spec](https://docs.digitalocean.com/products/app-platform/) template. The parser logic can be found in GitHub inside the [docker-to-iac repo](https://github.com/deploystackio/docker-to-iac/blob/main/src/parsers/digitalocean.ts).

## Parser language abbreviation for API

- `languageAbbreviation`: `DOP`.

## Prerequisite to deploy DigitalOcean App Spec

To use the DigitalOcean App Spec, you need a valid DigitalOcean account with access to the App Platform and sufficient credits.

## Architecture

The DigitalOcean App Spec will deploy your application using two main components:

### App Platform Services

- Each service from your Docker Compose file becomes an App Platform service
- Services are identified by their original service names
- The app auto-configures HTTPS routing:
  - First service gets the root path `/`
  - Additional services receive paths based on their names, e.g., `/servicename`

### Managed Databases

- Database containers (MySQL, PostgreSQL, etc.) are automatically converted to DigitalOcean managed databases
- Each database runs as a standalone managed instance, not within App Platform
- Database credentials and connection strings are automatically injected into your services

After deployment:

- Services can be accessed via links in your DigitalOcean dashboard
- Managed databases appear in your Databases section with connection details

## Default output format

- The default output format for this parser: `YAML`.

## Supported Docker Compose Variables

This parser supports the following Docker Compose variables for services:

- image
- environment
- ports
- command

::content-alert{type="note"}
Supported variables not listed above will be ignored. They will not be translated into the Infrastructure as Code from `docker-compose.yml` or docker run command.
::

## Database Support

DigitalOcean App Platform does not support running containerized database workloads due to its stateless nature and TCP protocol limitations. Therefore, the parser automatically converts database containers to DigitalOcean managed databases, ensuring proper data persistence and reliability. Supported databases include:

- MySQL
- PostgreSQL
- Redis
- MongoDB

### Configuration and Customization

The database conversion rules are defined in `src/config/digitalocean/database-types.ts`. This configuration maps Docker images to their corresponding DigitalOcean managed database services.

To add or modify database mappings:

1. Locate the `database-types.ts` file
2. Edit the `digitalOceanDatabaseConfig` object
3. Define the mapping using this structure:

```typescript
'docker.io/library/mysql': {
  engine: 'MYSQL',
  versions: ['8'],
  description: 'MySQL database service - requires managed database service due to TCP protocol'
}
```

### Example Transformation

Original docker-compose.yml:

```yaml
services:
  db:
    image: mariadb:11.2
    environment:
      MYSQL_DATABASE: myapp
  app:
    image: nginx:alpine
    ports:
      - "80:80"
```

Generated App Spec:

```yaml
spec:
  databases:
    - name: db
      engine: MYSQL
      version: "8"
      production: false
  services:
    - name: app
      # [service configuration]
```

::content-alert{type="important"}
Database services in docker-compose.yml must use official images from Docker Hub (e.g., mysql, mariadb, postgres) for automatic conversion to managed databases.
::

## Volume Support

DigitalOcean App Platform supports ephemeral files only. This means:

- No persistent volume storage is available
- Local filesystem is limited to 2GB
- Files are temporary and will be deleted after deployments or container replacements
- Each container instance has its own separate filesystem
- Changes to the filesystem are lost when instances are scaled or redeployed

::content-alert{type="warning"}
Any `volumes` directives in your docker-compose.yml or docker run command will be ignored during the translation to App Platform specifications.
::

## Multi Services Support

Multi `services` support for DigitalOcean: __yes__

DigitalOcean supports multiple services in a single App Spec file.

Please read more about [multi service support here](/docs/docker-to-iac/multi-services-support.md).
