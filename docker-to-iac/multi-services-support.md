# Multi Services Support

The term "multi service support" refers to the ability of a [parser](/docker-to-iac/parser-explanation.md) to interpret multiple services from a `docker-compose.yml` file.

## Example docker-compose file

Let's look at the `docker-compose.yml` file:

```text
version: '3.2'

services:
  frontend:
    image: nginx:alpine
    ports:
      - '8080:80'

  frontend:
    image: node:22-alpine
    ports:
      - '80:8080'
```

The `docker-compose.yml` file has two `services`. If a parser has the ability to translate to "multi-services", all `services` from `docker-compose.yml` will be translated into Infrastructure as Code template i.e. CloudFormation from AWS.

## Non Multi Services Support

However, this can vary from cloud provider to provider. Many providers have developed their own IaC (Infrastructure as Code) language, where the ability to deploy multiple containers at once is __not__ available.

If the cloud provider does not have the ability to deploy multiple containers at once, only the first service from the `docker-compose.yml` file will be translated into IaC.
