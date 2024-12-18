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

The DigitalOcean App Spec will deploy your application using App Platform services.

- Each service is identified by the original service name from the Docker Compose file.
- The app will be auto-configured to route traffic correctly using HTTPS.

If multiple services are specified, the following routing rules apply:

- The first service specified in the docker-compose file is assigned the root path `/`.
- Subsequent services receive a path based on their service name, e.g., `/servicename`.

After deployment, services can be accessed via the links in your DigitalOcean dashboard.

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
