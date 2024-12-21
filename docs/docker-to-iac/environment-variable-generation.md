---
description: Use docker-to-iac to automatically create environment variables for your Docker containers. Define rules for variable generation and maintain consistency across multiple deployments.
---

# Environment Variable Generation

The docker-to-iac module includes a system for handling environment variables, with a focus on database images and services that require secure credentials. This feature automatically generates appropriate values for environment variables and can maintain consistency across multiple template generations.

## Overview

When working with databases and other services that require credentials, you often need to generate secure passwords and consistent configuration values. The environment variable generation system:

- Automatically generates credentials and configuration values
- Maintains consistency across multiple template generations
- Handles version-specific variable names
- Supports different variable types (passwords, strings, numbers)

## Configuration Structure

Environment variable configurations are defined using a JSON structure that maps Docker images to their version-specific environment requirements:

```typescript
type EnvironmentVariableConfig = {
  [imageName: string]: {
    versions: {
      [version: string]: {
        environment: {
          [variableName: string]: {
            type: 'password' | 'string' | 'number';
            length?: number;
            pattern?: 'uppercase' | 'lowercase' | 'normal';
            min?: number;  // For number type
            max?: number;  // For number type
          }
        }
      }
    }
  }
}
```

## Usage Example

Here's how to use environment variable generation with a MariaDB container:

```javascript
import { translate } from '@deploystack/docker-to-iac';

// Define environment variable generation configuration
const envConfig = {
  'library/mariadb': {
    versions: {
      '>=11.0': {
        environment: {
          'MYSQL_ROOT_PASSWORD': {
            type: 'password',
            length: 16
          },
          'MYSQL_USER': {
            type: 'string',
            length: 8,
            pattern: 'lowercase'
          },
          'MYSQL_PASSWORD': {
            type: 'password',
            length: 16
          },
          'MYSQL_DATABASE': {
            type: 'string',
            length: 12,
            pattern: 'lowercase'
          }
        }
      }
    }
  }
};

// Your docker-compose.yml content with variable placeholders
const dockerComposeContent = `
version: '3'
services:
  db:
    image: mariadb:latest
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
`;

// Generate templates with persistent variables
const result1 = translate(dockerComposeContent, {
  source: 'compose',
  target: 'CFN',
  templateFormat: 'yaml',
  environmentVariableGeneration: envConfig,
  persistenceKey: 'my-unique-key'  // Use this to maintain consistent values
});

// Generate for another provider, reusing the same variables
const result2 = translate(dockerComposeContent, {
  source: 'compose',
  target: 'RND',
  templateFormat: 'yaml',
  environmentVariableGeneration: envConfig,
  persistenceKey: 'my-unique-key'  // Same key ensures same values are used
});
```

## Variable Types

### Password Type

Generates secure random passwords:

```json
{
  "type": "password",
  "length": 16  // Optional, defaults to 16
}
```

### String Type

Generates random strings with specified patterns:

```json
{
  "type": "string",
  "length": 8,  // Optional, defaults to 8
  "pattern": "lowercase"  // Optional: "uppercase", "lowercase", or "normal"
}
```

### Number Type

Generates random numbers within a specified range:

```json
{
  "type": "number",
  "min": 1000,  // Optional, defaults to 1
  "max": 9999   // Optional, defaults to 1000000
}
```

## Version Matching

The system supports semantic version matching:

- Version ranges: `">=11.0"`, `"<=10.5"`
- Exact versions: `"10.5"`, `"11.2"`
- Wildcard: `"*"` (matches any version)
- Latest: `"latest"` (matches latest version)

Example with version-specific configurations:

```json
{
  "library/mariadb": {
    "versions": {
      ">=11.0": {
        "environment": {
          "MYSQL_ROOT_PASSWORD": {
            "type": "password",
            "length": 16
          }
        }
      },
      "<=10.5": {
        "environment": {
          "MARIADB_ROOT_PASSWORD": {
            "type": "password",
            "length": 20
          }
        }
      }
    }
  }
}
```

## Persistence Key

The `persistenceKey` parameter allows you to maintain consistent variable values across multiple template generations:

- Use the same key when generating templates for different providers
- Generated values are cached and reused when the same key is provided
- Different keys will generate new sets of values
- Keys should be unique to your specific use case

## Important Notes

- Only variables using the `${VARIABLE_NAME}` syntax will be processed
- Variables without corresponding config entries retain their original values
- Generated passwords meet common security requirements (mixed case, numbers, special characters)
- String patterns affect the character set used in generation
- Version matching uses semantic versioning for comparison
- The `persistenceKey` should be unique to your specific deployment scenario

## Limitations

- Only supports public Docker Hub images currently
- Cannot generate values for build-time variables
- No support for complex variable dependencies
- Version matching requires valid semantic versions
