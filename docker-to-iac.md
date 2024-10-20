---
description: Introduction to the node module docker-to-iac which allows you to transfer docker-compose into IaC templates
---

# Docker to IaC

Docker to IaC is a Node.js module that translates the `docker-compose.yml` file into various types of Infrastructure as Code (IaC) templates. The goal of the module is to make GitHub repositories with docker-compose more easily accessible to various cloud providers such as Amazon Web Services (AWS), Google Cloud, DigitalOcean, and so on.

- GitHub repository: [github.com/deploymy/docker-to-iac](https://github.com/deploymy/docker-to-iac)
- npm registry: [npmjs.com/package/@deploymy/docker-to-iac](https://www.npmjs.com/package/@deploymy/docker-to-iac)

## Motivation

The project's motivation comes from the fact that there are so many cloud providers on the free market that it is impossible to know all of them.

How the project came about: you found an open source project that you want to deploy to your cloud provider, you found the `docker-compose.yml` file, and now you have to extract all the variables by hand or write the Infrastructure as Code template yourself because your company IT policy at work does not allow deployments without IaC. 😀

That's how it can work! That's why we want to simplify deployments and minimize vendor lock-in.

The focus of this project, however, is on container applications with `docker-compose.yml` or applications that can be containerized.

## Highlights

- List of all available parsers from module
- Support for docker-compose multiple services
- Setup for default settings for each cloud provider (i.e. CPU, RAM)
- Docker Compose services variables supported:
  - image, command, port, environment

## How does it work?

The principle of the translation is straightforward. You need a `docker-compose.yml` file and the desired cloud provider where you want to deploy your container. The docker-to-iac module translates `docker-compose.yml` into an IaC or one-click deploy template.

After the successful translation, you can deploy your containers to your cloud provider.

## Help wanted

We would be very happy if you could help us to extend the docker-to-iac module to include additional cloud providers (parsers). All open source repositories listed on our [deploy.my](https://deploy.my) website would benefit from this.

If the docker-to-iac module is extended with another parser, our backend automatically creates an update for the repository [github.com/deploymy/deploy-templates](https://github.com/deploymy/deploy-templates). Baiscally: if you add a new parser for the provider "foo-cloud" that has its own IaC language, or one-click deployment supported, all open source projects listed on deploy.my will be extended with the IaC template for cloud provider "foo-cloud".

Thank you!
