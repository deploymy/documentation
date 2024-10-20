---
description: Example code how a new parser must be added to the module so that it can be published
---

# Example of a new Parser

> [!TIP]  
> __Thank you__ for your interest in collaborating! The docker-to-iac module will remain open source forever. It is intended to simplify the deployment / IaC world a little and allow everyone to use the cloud provider they want, without vendor lock-in.

To add a new parser you need to consider the following things:

## Structure

Create a new file inside `src/parsers/new-provider.ts`:

```typescript
// src/parsers/new-provider.ts
import { BaseParser, ParserInfo, DockerCompose, TemplateFormat, formatResponse, DefaultParserConfig } from './base-parser';

const defaultParserConfig: DefaultParserConfig = {
  cpu: 512,
  memory: '1GB',
  templateFormat: TemplateFormat.yaml
};

class NewProviderParser extends BaseParser {
  parse(dockerCompose: DockerCompose, templateFormat: TemplateFormat = defaultParserConfig.templateFormat): any {
    let response: any = {};

    // Implement the logic to translate Docker Compose to the new provider's format

    return formatResponse(JSON.stringify(response, null, 2), templateFormat);
  }

  getInfo(): ParserInfo {
    return {
      website: "https://newprovider.deploy.my",
      officialDocs: "https://docs.newprovider.deploy.my",
      abbreviation: "NP",
      name: 'New Provider Cloud',
      defaultParserConfig: defaultParserConfig
    };
  }
}

export default new NewProviderParser();
```

The input of the `parse` method for `dockerCompose` is in JSON format. This allows you to easily implement or adapt your logic. The `formatResponse` method then formats the template in the required response format.

## Default Parser Config

If you want to add a new parser, you also know exactly which cloud provider. You have to select CPU and Memory as default values ​​in the default parser config.

It is best to keep the CPU and memory settings low (i.e. 1 vCPU, 1 GB RAM). The reason for this is that those who use our templates should not be surprised that they get a cloud bill that is very high.

The same setting applies to the template output format. Which format is appropriate for the cloud provider:

- `json` - JavaScript Object Notation
- `yaml` - yet another markup language
- `text` - for plain text

Example for `defaultParserConfig`

```typescript
const defaultParserConfig: DefaultParserConfig = {
  cpu: 512,
  memory: '1GB',
  templateFormat: TemplateFormat.yaml
};
```

## Testing your new parser

To test your parser, add a new test case to the file `test/test.ts`. Remember that you are testing all available output formats (yaml, json, text).

Edit file `test/test.ts`:

```typescript
//test/test.ts

// Testing New Provider Cloud Text
// NP = for new provider
const nfConfigText = translate(dockerComposeContent, 'NP', TemplateFormat.text);
console.log(`New Provider Cloud ${TemplateFormat.text}:`);
console.log(nfConfigText);
writeFileSync(`test/output/output-nf-${TemplateFormat.text}.txt`, nfConfigText);
```

The test can be executed using `npm run test`

## Build Step

You can build the module locally by running the `npm run build` command.

The built output files are located under `dist/`

## Update the docs

If you have made an improvement in code, please remember for the users of these modules to update our documentation. The rule for docs can be found in [deploymy/documentation README.md file](https://github.com/deploymy/documentation/blob/main/README.md).
