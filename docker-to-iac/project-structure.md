# Project Structure

The structure of the project does not deviate from the common model of how an npm module should be written.

If the structure is not self-explanatory for you, feel free to create a PR with an improvement.

Essentially:

- `test/` for test,
- `src/` for source files.

New parser should be created in subdir `src/parsers/`, as in the example of `aws-cloudformation.ts`.

```text
docker-to-iac/
|-- .github
|-- dist/
|-- src/
|   |-- index.ts
|   |-- parsers/
|       |-- aws-cloudformation.ts
|       |-- base-parser.ts
|-- test/
|   |-- sample-docker-compose.yml
|   |-- output/
|       |-- README.md
|   |-- test.ts
|-- .gitignore
|-- eslint.config.mjs
|-- LICENSE
|-- README.md
|-- package-lock.json
|-- package.json
|-- release.config.cjs
|-- tsconfig.json
```
