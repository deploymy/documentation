---
description: Quickstart in the docker-to-iac node module with which you can translate docker-compose into infrastructure as code templates
---

# Quickstart for docker-compose translation into IaC teampltes

## Installation

First, install the module and its dependencies:

```bash
npm i @deploystack/docker-to-iac
```

## Usage

Translating Docker Compose to AWS CloudFormation

```javascript
import { translate } from '@deploystack/docker-to-iac';
import { readFileSync, writeFileSync } from 'fs';

// Read Docker Compose file content as plain text
const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const translatedConfig = translate(dockerComposeContent, 'CFN');
console.log(translatedConfig);

// Write the translated config to a file
writeFileSync('output-aws.json', JSON.stringify(translatedConfig, null, 2));
```

For more examples, please visit the [API page](/modules/docker-to-iac/api.md). All supported parsers can be found in the sidebar on the left.
