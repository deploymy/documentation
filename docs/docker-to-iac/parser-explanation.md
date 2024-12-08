---
description: Understand how parsers translate Docker run commands and Docker Compose files into cloud-specific Infrastructure as Code templates. Learn about provider configurations and language support.
---

# Parser Explanation in docker-to-iac

A parser in docker-to-iac translates Docker configurations (either Docker run commands or docker-compose.yml files) into Infrastructure as Code (IaC) or One-Click Deploy templates. Each parser is designed to target a specific IaC language or cloud provider template format.

## Input Types

docker-to-iac can process two types of input:

### Docker Run Commands

```bash
docker run -d -p 8080:80 -e NODE_ENV=production nginx:latest
```

### Docker Compose Files

```yaml
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    environment:
      NODE_ENV: production
```

## API

For detailed API documentation, see the [parser API reference](/docs/docker-to-iac/api.md).

## Default Parser Config

Each parser includes default configurations specific to its target cloud provider. These defaults are necessary because providers have different compute specifications and limitations.

Example: AWS Fargate has a minimum CPU allocation of 256, while DigitalOcean's [minimum setting is 1 vCPU](https://www.digitalocean.com/pricing/app-platform). The default parser config handles these provider-specific requirements.

To retrieve default parser configurations through the API, see the [parser info documentation](/docs/docker-to-iac/api.md#get-parser-info).

## Parser vs. Language

The [ParserInfo type](https://github.com/deploystackio/docker-to-iac/blob/main/src/parsers/base-parser.ts) separates variables between `Provider` and `Language`. This separation exists because some cloud providers support multiple IaC languages.

For example, AWS infrastructure can be defined using:

- CloudFormation
- AWS CDK (for TypeScript, Python, etc.)
- Terraform

When adding new parsers, consider whether multiple IaC languages are possible for your target provider. This affects how you name your parser file in `src/parsers/<IAC_LANGUAGE_FILE_NAME>.ts`. It's why the [`translate()`](/docs/docker-to-iac/api.md#translate-api) method requires the target IaC language name (e.g., `CFN`) rather than the provider name (e.g., `AWS`).

## Parser Implementation Notes

Creating parsers for multi-cloud IaC tools like Terraform presents additional challenges. Terraform's [extensive provider ecosystem](https://registry.terraform.io/browse/providers) means a Terraform parser would need complex logic to handle various provider-specific implementations, making maintenance more difficult.

In contrast, single-provider languages like AWS CloudFormation have a one-to-one relationship with their cloud provider, simplifying parser implementation and maintenance.
