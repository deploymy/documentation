---
description: Technical solutions for common DeployStack deployment issues. Find answers to repository submission errors, license restrictions, and Docker Compose validation problems.
---

# Troubleshooting

This guide helps you resolve common issues that might occur when submitting your repository to DeployStack.

## Invalid GitHub Repository URL

This error occurs when the submitted URL doesn't match the expected GitHub repository URL format.

**Common causes:**

- Missing 'github.com' in the URL
- Including query parameters

**Solution:**
Use the standard GitHub repository URL format:

```text
https://github.com/username/repository
```

## Repository License Not Permitted

We don't support certain licenses to protect both our users and our service. Here's what we currently don't support:

| License Type | Reason for Restriction |
|-------------|------------------------|
| No License | Without a license, the code defaults to exclusive copyright, making it legally risky to use or deploy |
| Proprietary License | These licenses typically restrict redistribution and modification rights |
| Commons Clause | This addition to licenses restricts commercial use of the software |
| Shared Source | These licenses often include terms that limit deployment and distribution |
| Custom License | Custom licenses require individual legal review and may contain problematic terms |

**Other Restrictions:**

- Licenses containing "proprietary" terms
- Licenses with Commons Clause additions
- Licenses marked as "shared source"
- Any repository without clear license information

**Solution:**

Ensure your repository:

- Uses a widely accepted open-source license (MIT, Apache, GPL, etc.)
- Has clear license information in the repository
- If you can, change your repository license to a supported one
- For special cases, whitelist requests can be submitted via [Discord](https://discord.gg/UjFWwByB) or Twitter DM

## Invalid Base64 Encoding for Docker File

This error occurs during our internal processing of your docker-compose file.

**Common causes:**

- File encoding issues
- Special characters in the file
- File corruption

**Solution:**

- Verify your docker-compose file uses UTF-8 encoding
- Remove any special characters
- Try re-creating the file if issues persist

## Invalid Docker Compose File

The submitted docker-compose file doesn't meet the required format or contains unsupported features.

**Common causes:**

- Invalid YAML syntax
- Unsupported Docker Compose version
- Missing required fields
- Using unsupported features

**Solution:**

- Validate your docker-compose file syntax
- Check our [Docker Compose Requirements](/deploystack/docker-compose-requirements.md) page
- Ensure you're using supported features only

## Error Converting Docker Compose to IaC

This error occurs when our system cannot convert your docker-compose configuration to Infrastructure as Code templates.

**Common causes:**

- Unsupported service configurations
- Complex dependencies
- Resource definitions that can't be mapped to cloud provider services

**Solution:**

- Simplify your docker-compose configuration
- Review our [supported features documentation](/docs/docker-to-iac/supported-docker-compose-variables.md)
- Ensure all services use supported configurations

## Error Listing Services from Docker Compose

The system couldn't properly parse the services defined in your docker-compose file.

**Common causes:**

- Malformed service definitions
- Missing required service properties
- Invalid service configurations

**Solution:**

- Verify each service has the required `image` property
- Check service definitions follow the correct format
- Remove any unsupported service configurations

## Internal Server Error

This indicates an unexpected error in our validation process.

**What it means:**

- The error is on our end :D
- The issue isn't related to your repository or configuration
- We needs to investigate

**What to do:**

1. Try your submission again after a few minutes
2. If the error persists, join our [Discord community](https://discord.gg/UjFWwByB)
3. Report the issue with:
   - Your repository URL
   - Timestamp of the error
   - Any error messages you received

## General Troubleshooting Tips

1. Validate your docker-compose file locally before submission
2. Ensure your repository meets all [requirements](/deploystack/docker-compose-requirements.md)
3. Check that all services use supported configurations
4. Verify your repository is public and accessible

## Need More Help?

If you're still experiencing issues:

- Join our [Discord community](https://discord.gg/UjFWwByB)
- Check our [Docker Compose Requirements](/deploystack/docker-compose-requirements.md)
- Review [supported features](/docs/docker-to-iac/supported-docker-compose-variables.md)
