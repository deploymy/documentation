---
description: Explanation of the term parser. What we mean by a parser in the context of docker-to-iac module.
---

# Term Parser Explanation in context of docker-to-iac

A parser always represents a selected IaC (Infrastructure as Code) or One-Click Deploy template. A parser therefore translates the `docker-compose.yml` file into the target IaC template.

## API

If you are looking for [parser API, click here](/docker-to-iac/api.md).

## Default Parser Config

Each parser has its own config when it comes to default values. This is necessary because each cloud provider like AWS, Google Cloud or Digital Ocean has different compute plans.

Example: for AWS you can allocate a minimum of 256 CPU for a docker container in fargate. For DigitalOcean the [minimum setting is 1 vCPU](https://www.digitalocean.com/pricing/app-platform). Therefore the default config is necessary.

You can read how to get default parser values ​​through API [here](/docker-to-iac/api.md#get-parser-info).

## Examples

For example, a parser can translate `docker-compose.yml` into AWS CloudFormation.

CloudFormation is only supported by one cloud provider, namely AWS (Amazon Web Services). This means that the choice of parser is always a one-to-one relationship.

It is not so easy to create a parser for IaC templates that supports multi-cloud such as Terraform, as Terraform itself [has various providers](https://registry.terraform.io/browse/providers) in its ecosystem. More logic had to be built in when creating Terraform, which makes the Terraform parser almost unmaintainable.
