---
description: Learn how to test the docker-to-iac module with complete guides for local testing, automated checks, and CI/CD integration. Step-by-step instructions for developers.
---

# How to test docker-to-iac module

Before submitting a pull request, you should test your code locally. The testing process includes both code quality checks and functional testing.

## Running Tests

### Code Quality Check

First, run ESLint to ensure code quality:

```bash
npm run lint
```

ESLint must pass locally before submitting your PR, as the GitHub Actions CI/CD will block any PR that fails the lint check.

### Functional Testing

Run the test suite:

```bash
npm run test
```

The test suite runs comprehensive checks across all parsers and formats. The testing structure is as follows:

```text
test/
├── docker-compose-files/   # Place test docker-compose files here
│   ├── file1.yml
│   ├── file2.yaml
│   └── ...
├── output/                 # Generated test outputs
│   └── [filename]/        # One directory per docker-compose file
│       ├── services.json  # Output of listServices
│       ├── cfn/          # AWS CloudFormation outputs
│       │   ├── output.json
│       │   ├── output.yml
│       │   └── output.txt
│       ├── rnd/          # Render outputs
│       └── dop/          # DigitalOcean outputs
└── test.ts               # Main test file
```

The test suite automatically:

- Tests all parsers listed by `listAllParsers()`
- Processes all docker-compose files in `test/docker-compose-files/`
- Generates outputs in all supported formats (JSON, YAML, text)
- Validates parser information and service listing
- Creates organized output directories for inspection

### Adding Tests for New Parsers

When adding a new parser:

1. Place test docker-compose files in `test/docker-compose-files/`
2. The test suite will automatically include your new parser in its testing cycle
3. Check the generated outputs in the `test/output/` directory

## Local Testing with `npm link`

You can also test locally using `npm link`. Here's how to set up a development environment:

Directory structure:

```text
some-root-dir/
|-- docker-to-iac/
|-- my-dev-env/
|   |-- index.ts
|   |-- docker-compose.yml
|   |-- node_modules/
|   |-- package.json
```

Setup steps:

1. In `docker-to-iac/` directory: `npm link`
2. In `my-dev-env` directory: `npm link ../docker-to-iac/`

### Setting up my-dev-env

1. Initialize the directory:

```bash
npm init
```

2. Create an `index.js` test file:

```javascript
import { translate } from '@deploystack/docker-to-iac';
import { readFileSync } from 'fs';

// Read Docker Compose file content
const dockerComposeContent = readFileSync('docker-compose.yml', 'utf8');

// Test translation
const translatedConfig = translate(dockerComposeContent, 'CFN', 'yaml');
console.log(translatedConfig);
```

3. Test your changes:
   - Make changes in `docker-to-iac/`
   - Run `npm run build` in docker-to-iac
   - Test changes in `my-dev-env/` with `node index.js`

## Test Results

The test suite provides clear console output indicating success (✓) or failure (❌) for each test. If any test fails:

- The error will be logged with details
- The test process will exit with code 1
- GitHub Actions will fail the PR check

You can find a list of [all available commands here](/modules/docker-to-iac/available-commands.md).

Remember to check the generated outputs in `test/output/` to verify that your parser produces the expected results across all formats.
