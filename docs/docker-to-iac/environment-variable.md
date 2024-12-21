---
description: Learn how to manage environment variables in docker-to-iac. Pass configuration values from .env files to your Infrastructure as Code templates and keep your sensitive data secure.
---

# Environment Variables

The docker-to-iac module supports passing environment variables from `.env` files to your Infrastructure as Code templates. This feature allows you to manage configuration values separately from your Docker configurations and maintain consistency across deployments.

## Overview

When translating Docker configurations to Infrastructure as Code templates, you can provide environment variables that will be used to replace placeholders in your Docker configurations. This is particularly useful for:

- Managing configuration values separately from Docker files
- Providing credentials and sensitive information
- Maintaining consistent values across different deployment environments

## Usage

### Reading Environment Variables

The module provides a utility function `parseEnvFile` to read and parse `.env` files:

```javascript
import { translate, parseEnvFile } from '@deploystack/docker-to-iac';
import { readFileSync } from 'fs';

// Read and parse the .env file
const envContent = readFileSync('.env', 'utf-8');
const envVariables = parseEnvFile(envContent);
```

### Using Environment Variables in Translation

Pass the environment variables to the `translate` function using the `environmentVariables` option:

```javascript
const result = translate(dockerConfig, {
  source: 'run',  // or 'compose'
  target: 'RND',  // or other supported targets
  templateFormat: 'yaml',
  environmentVariables: envVariables
});
```

## Complete Example

Here's a complete example showing how to use environment variables with a MariaDB container:

```javascript
import { translate, parseEnvFile } from '@deploystack/docker-to-iac';
import { readFileSync } from 'fs';

// Read the .env file
const envContent = readFileSync('.env', 'utf-8');
const envVariables = parseEnvFile(envContent);

// Docker run command with environment variable placeholders
const dockerRunCommand = `docker run -d \
  --name mariadb \
  -e MYSQL_ROOT_PASSWORD=\${DB_PASSWORD} \
  -e MYSQL_USER=\${DB_USERNAME} \
  -e MYSQL_PASSWORD=\${DB_PASSWORD} \
  -e MYSQL_DATABASE=\${DB_DATABASE} \
  -v db:/var/lib/mysql \
  docker.io/library/mariadb:11.2`;

// Translate with environment variables
const result = translate(dockerRunCommand, {
  source: 'run',
  target: 'RND',
  templateFormat: 'yaml',
  environmentVariables: envVariables
});
```

### .env File Format

Your `.env` file should follow standard environment file format:

```bash
# .env
DB_USERNAME=myuser
DB_PASSWORD=mysecretpassword
DB_DATABASE=mydatabase
```

### Variable Substitution

Environment variables are substituted using the `${VARIABLE_NAME}` syntax in your Docker configurations:

```yaml
# In docker-compose.yml
services:
  db:
    image: mariadb:11.2
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_DATABASE}
```

## Working with Docker Compose

The environment variables feature works with both Docker run commands and docker-compose.yml files:

```javascript
// For docker-compose.yml
const dockerComposeContent = readFileSync('docker-compose.yml', 'utf-8');

const result = translate(dockerComposeContent, {
  source: 'compose',
  target: 'RND',
  templateFormat: 'yaml',
  environmentVariables: envVariables
});
```

## Important Notes

- Environment variables take precedence over default values in Docker configurations
- Missing environment variables will result in empty values in the output templates
- The module does not validate environment variable values
- Sensitive information should be handled securely
- Variable names are case-sensitive

## Limitations

- Only supports basic environment variable substitution
- No support for variable expansion or shell-style variable manipulation
- Cannot reference other environment variables within values
- No built-in encryption for sensitive values
