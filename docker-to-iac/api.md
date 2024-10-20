---
description: List of all available APIs for the docker-to-iac module. List of all parsers, get parser information and translate API.
---

# docker-to-iac module API list

In this page you will find all possible APIs for package docker-to-iac.

## List all Parser

```javascript
import { listAllParsers } from '@deploymy/docker-to-iac';

const parsers = listAllParsers();

console.log('Available Parsers:');
console.log(parsers);
```

Example output:

```json
[
  {
    website: 'https://aws.amazon.com/cloudformation/',
    officialDocs: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
    abbreviation: 'CFN',
    name: 'AWS CloudFormation',
    defaultParserConfig: { cpu: 512, memory: '1GB', templateFormat: 'yaml' }
  }
]
```

## Get Parser Info

If you want to extract the `defaultParserConfig` object from a parser, the `getParserInfo` method is the most suitable for this.

```javascript
import { getParserInfo } from '@deploymy/docker-to-iac';

const awsInfo = getParserInfo('CFN');

console.log('Available Parsers:');
console.log(awsInfo);
```

Example output:

```json
{
  website: 'https://aws.amazon.com/cloudformation/',
  officialDocs: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
  abbreviation: 'CFN',
  name: 'AWS CloudFormation',
  defaultParserConfig: { cpu: 512, memory: '1GB', templateFormat: 'yaml' }
}
```

## Translate API

### Available variables

```javascript
translate(DOCKER_COMPOSE_CONTENT, SUPPORTED_PLATFORMS, TEMPLATE_FORMAT)
```

#### `DOCKER_COMPOSE_CONTENT`

The docker compose content you want to translate.

#### `SUPPORTED_PLATFORMS`

List of supported plattforms / IaC Templates.

Currently we support:

Please see the sitebar on the left, section Parsers.

#### `TEMPLATE_FORMAT` (Optional)

The response format, you want to get.

Currently we support:

- `json` - JavaScript Object Notation
- `yaml` - yet another markup language
- `text` - for plain text

> [!IMPORTANT]  
> For some IaC languages ​​it doesn't make sense to output them in text, JSON or YAML. For example: CloudFormation only accepts YAML or JSON. So be careful what you choose.

### Example

```javascript
mport { readFileSync, writeFileSync } from 'fs';
import { translate } from '@deploymy/docker-to-iac';

const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const translatedConfig = translate(dockerComposeContent, 'CFN');
console.log(translatedConfig);
```

Example output:

```yaml
AWS CloudFormation yaml:
AWSTemplateFormatVersion: 2010-09-09
Description: Deplo.my CFN template translated from Docker compose
Parameters:
  VPC:
    Type: AWS::EC2::VPC::Id
  SubnetA:
    Type: AWS::EC2::Subnet::Id
  SubnetB:
    Type: AWS::EC2::Subnet::Id
  ServiceName:
    Type: String
    Default: DeployMyService
Resources:
  Cluster:
    Type: AWS::ECS::Cluster
    Properties:
      ClusterName: !Join ['', [!Ref ServiceName, Cluster]]
  ExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: !Join ['', [!Ref ServiceName, ExecutionRole]]
      AssumeRolePolicyDocument:
        Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
...
```
