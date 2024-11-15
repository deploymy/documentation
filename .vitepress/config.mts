import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  transformPageData(pageData) {

    const canonicalUrl = `https://docs.deploystack.io/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '');

    pageData.frontmatter.head ??= []

    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:title',
        content: `${pageData.title}`
      }
    ]);

    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:description',
        content: pageData.description
      }
    ]);
    
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:url',
        content: canonicalUrl
      }
    ]);
    
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:type',
        content: 'article'
      }
    ]);

    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ]);
    
    // return head
  },  
  lang: 'en-US',
  title: "DeployStack Docs",
  titleTemplate: false,
  cleanUrls: true,
  description: "DeployStack Full Documentation and API",
  head: [
    ['meta', { name: "google-site-verification", content: "mK205yW9P5vsKa_6QqOyqCY0NvODBGcprdOUkDC0nDA"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/favicon-32-32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/favicon-16-16.png"}],    
    ['link', { rel: "shortcut icon", href: "/img/favicon.png"}],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],    
  ],  
  sitemap: {
    hostname: 'https://docs.deploystack.io'
  },  
  srcExclude: ['**/README.md'],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
		logo: {
			light: '/img/deploystack-logo-transparent-22x24.webp',
			dark: '/img/deploystack-logo-transparent-22x24.webp',
      alt: 'DeployStack Logo'
		}, 
    nav: [
      { text: 'DeployStack Docs', link: '/deploystack/getting-started.md' },
      { text: 'Docker-To-IaC Docs', link: '/modules/docker-to-iac' },
      { text: 'DeployStack ', link: 'https://deploystack.io' }
    ],
    sidebar: {
      '/deploystack/': { base: '/deploystack/', items: sidebarDeployStack() },
      '/modules/': { base: '/modules/', items: sidebarModules() }
    },    
    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/deploystack' },
      { icon: 'github', link: 'https://github.com/deploystackio' }
    ],
		search: {
			provider: 'local',
		},
		editLink: {
			pattern: 'https://github.com/deploystackio/documentation/edit/main/:path',
			text: 'Edit on GitHub'
		},
		outline: {
			level: [2,3]
		},
    footer: {
      message: '<a target=_blank href="https://deploystack.io">DeployStack</a> Documentation',
      copyright: '<a target="_blank" rel="nofollow" href="https://deploystack.io/privacy-policy">Privacy Policy</a> <strong>|</strong> <a target="_blank" rel="nofollow" href="https://deploystack.io/cookie-policy">Cookie Policy</a>'
    }     
  }
})

function sidebarDeployStack(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'DeployStack',
      base: '/deploystack/',
      link: '/',
      items: [
        { text: 'Getting Started', link: 'getting-started.md' },
        { 
          text: 'Core Concepts', 
          items: [
            { text: 'Docker Compose Requirements', link: 'docker-compose-requirements' },
            { text: 'One-Click Deploy', link: 'one-click-deploy' },
            { text: 'Troubleshooting', link: 'troubleshooting' },
          ] 
        },
      ]
    }
  ]
}

function sidebarModules(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Modules',
      base: '/modules/',
      items: [
        {
          text: 'Docker-To-IaC',
          base: '/modules/docker-to-iac/',
          items: [ 
            {
              text: 'Introduction',
              link: '/',
            },
            {
              text: 'Usage & Concept',
              items: [
                { text: 'Quickstart', link: 'quickstart' },
                { text: 'API', link: 'api' },
                { text: 'Parser Explanation', link: 'parser-explanation' },
                { text: 'Multi Services Support', link: 'multi-services-support' },
                { text: 'Supported Docker Compose Variables', link: 'supported-docker-compose-variables' },
                { text: 'Supported Registries', link: 'supported-registries' },
                { text: 'Limitations', link: 'limitations' }
              ]
            },
            {
              text: 'Parsers',
              link: 'parser',
              items: [
                { text: 'AWS CloudFormation', link: 'parser/aws-cloudformation' },
                { text: 'Render.com', link: 'parser/render.com' },
                { text: 'DigitalOcean', link: 'parser/digitalocean' }
              ]
            },
            {
              text: 'Development',
              items: [
                { text: 'Before you Start', link: 'before-you-start' },
                { text: 'Available Commands', link: 'available-commands' },
                { text: 'Project Structure', link: 'project-structure' },
                { text: 'Testing', link: 'testing' },
                { text: 'Example of a New Parser', link: 'example-of-a-new-parser' },
                { text: 'Publishing to npm', link: 'publishing-to-npm' }
              ]
            }
          ]
        }
      ]
    }
  ]
}