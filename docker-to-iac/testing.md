# Testing

Before you submit a pull request, you can test the code locally. To do so, you must run the following commands:

```bash
# Running ESLint
npm run list
```

Check locally if the output of ESList was also successful, if it fails locally, it will also fail in GitHub Action CI/CD and pull request merge will be blocked.

```bash
# Running Test
npm run test
```

When the test is executed, the `test.ts` file is triggered. If you have added a new parser, you should of course also add tests for your parser there.

You can find a list of [all commands here](/docker-to-iac/available-commands.md).

## Local test through `link`

You can also test locally by using `npm link`. Let's assume you have the following directory structure:

```text
some-root-dir/
|-- docker-to-iac/
|-- my-dev-end/
|   |-- index.ts
|   |-- docker-compose.yml
|   |-- node_modules/
|   |-- package.json
```

You have the directory where you develop the __docker-to-iac__ module `docker-to-iac` and a directory where you test your module without creating an npm package `my-dev-end`.

1. Go to `docker-to-iac/` dir and run `npm link`
2. Go to `my-dev-end` dir and run `npm link ../docker-to-iac/`

### my-dev-end setup

Just run `npm init` inside the dir `my-dev-end` and create a simple `index.js` file.

A test could look like this:

```javascript
import { translate } from '@deploymy/docker-to-iac';
import { readFileSync, writeFileSync } from 'fs';

// Read Docker Compose file content as plain text
const dockerComposeContent = readFileSync('docker-compose.yml', 'utf8');

// console.log(dockerComposeContent)

const translatedConfig = translate(dockerComposeContent, 'CFN', 'yaml');
console.log(translatedConfig);
```

The test looks exactly like __[Quickstart](/docker-to-iac/quickstart.md)__ code snippet.

Now you can go back to the module repository `docker-to-iac/` make some changes and run `npm run build`. You can then test the new changes in `my-dev-end/` dir by running `node index.js` for example.
