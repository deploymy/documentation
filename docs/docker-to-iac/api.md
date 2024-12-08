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

Translate Docker configurations (both Docker run commands and docker-compose.yml files) into your chosen Infrastructure as Code language.

### Function Signature

```typescript
translate(input: string, options: {
  source: 'run' | 'compose',
  target: string,
  templateFormat?: TemplateFormat
}): any
```

### Examples

#### Translating Docker Compose

```javascript
import { readFileSync, writeFileSync } from 'fs';
import { translate } from '@deploystack/docker-to-iac';

const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const translatedConfig = translate(dockerComposeContent, {
  source: 'compose',
  target: 'CFN',
  templateFormat: 'yaml'
});
console.log(translatedConfig);
```

#### Translating Docker Run Command

```javascript
import { translate } from '@deploystack/docker-to-iac';

const dockerRunCommand = 'docker run -d -p 8080:80 nginx:latest';

const translatedConfig = translate(dockerRunCommand, {
  source: 'run',
  target: 'CFN',
  templateFormat: 'yaml'
});
console.log(translatedConfig);
```

### Example Output (AWS CloudFormation)

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Generated from container configuration by docker-to-iac
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

### Parameters

#### `input: string`

For Docker Compose: The contents of your docker-compose.yml file
For Docker run: The complete docker run command

#### `options.source: 'run' | 'compose'`

Specifies the input type:

- `'run'` - For Docker run commands
- `'compose'` - For Docker Compose files

#### `options.target: string`

The IaC language to translate to. Currently supported targets:
Please see the sidebar on the left, section Parsers.

#### `options.templateFormat?: TemplateFormat`

Optional. The desired output format:

- `'json'` - JavaScript Object Notation
- `'yaml'` - YAML format
- `'text'` - Plain text

::content-alert{type="important"}
Not all template formats are valid for every IaC language. For example, AWS CloudFormation only accepts YAML or JSON formats. Choose a format compatible with your target IaC language.
::

### Return Value

Returns the translated Infrastructure as Code template in the specified format. The structure and content will vary based on the target IaC language and template format chosen.

## List Services API

Extract service configurations from either Docker run commands or docker-compose.yml files as structured JSON objects.

### Function Signature

```typescript
listServices(input: string, source: 'run' | 'compose'): { [key: string]: ServiceConfig }
```

### Examples

#### Listing Docker Compose Services

```javascript
import { readFileSync } from 'fs';
import { listServices } from '@deploystack/docker-to-iac';

const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const services = listServices(dockerComposeContent, 'compose');
console.log(services);
```

##### Output

```json
{
  "db": {
    "image": "redis:latest",
    "ports": ["6379:6379"],
    "command": "",
    "restart": "always",
    "volumes": ["rediscache:/data"],
    "environment": {
      "PASSWORD": "secret"
    }
  },
  "web": {
    "image": "nginx:alpine",
    "ports": ["80:80"],
    "restart": "always",
    "volumes": ["volumenginx:/var/www/html:z,ro"],
    "environment": {}
  }
}
```

#### Listing Docker Run Services

```javascript
import { listServices } from '@deploystack/docker-to-iac';

const dockerRunCommand = 'docker run -d -p 8080:80 -e NODE_ENV=production nginx:latest';

const services = listServices(dockerRunCommand, 'run');
console.log(services);
```

##### Output

```json
{
  "service": {
    "image": "nginx:latest",
    "ports": ["8080:80"],
    "environment": {
      "NODE_ENV": "production"
    }
  }
}
```

### Parameters

#### `input: string`

- For Docker Compose: The contents of your docker-compose.yml file
- For Docker run: The complete docker run command

#### `source: 'run' | 'compose'`

Specifies the input type:

- `'run'` - For Docker run commands
- `'compose'` - For Docker Compose files

### Return Value

Returns an object where:

- Keys are service names
- Values are service configurations containing:
  - `image`: Docker image name and tag
  - `ports`: Array of port mappings
  - `command`: Custom command (if specified)
  - `restart`: Restart policy (if specified)
  - `volumes`: Array of volume mappings (if specified)
  - `environment`: Object of environment variables
