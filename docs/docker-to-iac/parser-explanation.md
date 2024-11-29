---
description: Understand how parsers translate Docker Compose files into cloud-specific Infrastructure as Code templates. Learn about provider configurations and language support.
---

# Term Parser Explanation in context of docker-to-iac

A parser always represents a selected IaC (Infrastructure as Code) or One-Click Deploy template. A parser therefore translates the `docker-compose.yml` file into the target IaC template.

## API

If you are looking for [parser API, click here](/docs/docker-to-iac/api.md).

## Default Parser Config

Each parser has its own config when it comes to default values. This is necessary because each cloud provider like AWS, Google Cloud or Digital Ocean has different compute plans.

Example: for AWS you can allocate a minimum of 256 CPU for a docker container in fargate. For DigitalOcean the [minimum setting is 1 vCPU](https://www.digitalocean.com/pricing/app-platform). Therefore the default config is necessary.

You can read how to get default parser values ​​through API [here](/docs/docker-to-iac/api.md#get-parser-info).

## Parser vs. Lanauge

The [type `ParserInfo`](https://github.com/deploystackio/docker-to-iac/blob/main/src/parsers/base-parser.ts) includes the splitting of vars between a `Provider` and `Language`. This is necessary because some providers allow multiple languages.

AWS can be mentioned as an example here. In AWS, infrastructure can be created with:

- CloudFormation
- AWS CDK (i.e. for TypeScript)
- Terraform

Therefore, when we add a new parser, check if multiple IaC languages ​​are possible. Keep this in mind when naming the new parser in directory `src/parsers/<IAC_LANGUAGE_FILE_NAME>.ts`. This is also the reason why the [`translate()`](/docs/docker-to-iac/api.md#translate-api) method asks for the target IaC language name (i.e. `CFN`) and not for the provider name (i.e. `AWS`).

## Examples

For example, a parser can translate `docker-compose.yml` into AWS CloudFormation.

CloudFormation is only supported by one cloud provider, namely AWS (Amazon Web Services). This means that the choice of parser is always a one-to-one relationship.

It is not so easy to create a parser for IaC templates that supports multi-cloud such as Terraform, as Terraform itself [has various providers](https://registry.terraform.io/browse/providers) in its ecosystem. More logic had to be built in when creating Terraform, which makes the Terraform parser almost unmaintainable.
