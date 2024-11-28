---
description: Here's everything you need to know about our docker-to-iac module - from listing available cloud providers to converting your Docker setup into deployable code.
---

# docker-to-iac module API list

In this page you will find all possible APIs for package docker-to-iac.

## List all Parser

To list all available parsers, please use the `listAllParsers()` method.

### Example

```typescript
import { listAllParsers } from '@deploystack/docker-to-iac';

const parsers = listAllParsers();

console.log('Available Parsers:');
console.log(parsers);
```

#### Output

```json
[
  {
    providerWebsite: 'https://aws.amazon.com/cloudformation/',
    providerName: 'Amazon Web Services',
    provieerNameAbbreviation: 'AWS',
    languageOfficialDocs: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
    languageAbbreviation: 'CFN',
    languageName: 'AWS CloudFormation',
    defaultParserConfig: { fileName: 'aws-cloudformation.yaml', cpu: 512, memory: '1GB', templateFormat: 'yaml' }
  },
  {
    providerWebsite: 'https://render.com/docs',
    providerName: 'Render',
    provieerNameAbbreviation: 'RND',
    languageOfficialDocs: 'https://docs.render.com/infrastructure-as-code',
    languageAbbreviation: 'RND',
    languageName: 'Render Blue Print',
    defaultParserConfig: {
      subscriptionName: 'free',
      region: 'oregon',
      fileName: 'render.yaml',
      templateFormat: 'yaml'
    }
  }
]
```

### Type

```typescript
listAllParsers(): ParserInfo[]
```

## Get Parser Info

If you want to extract the `defaultParserConfig` object from a parser, the `getParserInfo` method is the most suitable for this.

### Example

```typescript
import { getParserInfo } from '@deploystack/docker-to-iac';

const awsInfo = getParserInfo('CFN');

console.log('Available Parsers:');
console.log(awsInfo);
```

#### Output

```json
{
    providerWebsite: 'https://aws.amazon.com/cloudformation/',
    providerName: 'Amazon Web Services',
    provieerNameAbbreviation: 'AWS',
    languageOfficialDocs: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
    languageAbbreviation: 'CFN',
    languageName: 'AWS CloudFormation',
    defaultParserConfig: { fileName: 'aws-cloudformation.yaml', cpu: 512, memory: '1GB', templateFormat: 'yaml' }
}
```

### Type

```typescript
getParserInfo(languageAbbreviation: string): ParserInfo
```

## Translate API

Translate the `docker-compose.yml` file into target language you select.

### Example

```javascript
import { readFileSync, writeFileSync } from 'fs';
import { translate } from '@deploystack/docker-to-iac';

const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const translatedConfig = translate(dockerComposeContent, 'CFN');
console.log(translatedConfig);
```

#### Output

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
    Default: DeployStackService
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

### Type

```typescript
translate(dockerComposeContent: string, languageAbbreviation: string, templateFormat?: TemplateFormat): any
```

#### `dockerComposeContent`

The docker compose content you want to translate.

#### `languageAbbreviation`

List of supported IaC languages.

Currently we support:

Please see the sitebar on the left, section Parsers.

#### `templateFormat` (Optional)

The response format, you want to get.

Currently we support:

- `json` - JavaScript Object Notation
- `yaml` - yet another markup language
- `text` - for plain text

> [!IMPORTANT]  
> For some IaC languages ​​it doesn't make sense to output them in text, JSON or YAML. For example: CloudFormation only accepts YAML or JSON. So be careful what you choose.

## List Services API

List all services from `docker-compose.yml` as JSON object.

### Example

```javascript
import { readFileSync, writeFileSync } from 'fs';
import { listServices } from '@deploystack/docker-to-iac';

const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const services = listServices(dockerComposeContent);
console.log(services);
```

#### Output

```json
{
  db: {
    image: 'redis:latest',
    ports: [ '6379:6379' ],
    command: '',
    restart: 'always',
    volumes: [ 'rediscache:/data' ],
    environment: {
      PASSWORD: 'secret'
    }
  },
  web: {
    image: 'nginx:alpine',
    ports: [ '80:80' ],
    restart: 'always',
    volumes: [ 'volumenginx:/var/www/html:z,ro' ],
    environment: {}
  }
}
```

### Type

```typescript
listServices(dockerComposeContent: string): { [key: string]: DockerComposeService }
```

#### `dockerComposeContent`

The docker compose content you want to translate.
