# Parser - AWS CloudFormation

The parser for CloudFormation translates the `docker-compose.yml` file into CloudFormation. The parser logic can be found in GitHub inside [docker-to-iac repo](https://github.com/deploymy/docker-to-iac/blob/main/src/parsers/aws-cloudformation.ts).

## Parser abbreviation for API

- Abbreviation: `CFN`.

## Default output format

- The default output format for this parser: `YAML`.

## Supported Docker Compose Variables

The current version supports the following Docker Compose variables:

For **services**:

- image
- environment
- ports
- command

> [!NOTE]
> The supported variables that are not on this list are ignored. This means that they are not translated by the parser in Infrastructure as Code from docker-compose.yml.

## Multi Services Support

Multi `services` support for CloudFormation: **yes**

Please read more about [multi service support here](/docker-to-iac/multi-services-support.md).
