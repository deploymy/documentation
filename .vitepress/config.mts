import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  transformPageData(pageData) {

    const canonicalUrl = `https://docs.deploy.my/${pageData.relativePath}`
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
  title: "Deploy.my Docs",
  titleTemplate: false,
  cleanUrls: true,
  description: "Deploy.my Full Documentation and API",
  head: [
    ['meta', { name: "google-site-verification", content: "ENkXzWyVdWGJDVd9blSXN63XOCMqAv7w8QaqyvikKvo"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/favicon-32-32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/favicon-16-16.png"}],    
    ['link', { rel: "shortcut icon", href: "/img/favicon.png"}]
  ],  
  sitemap: {
    hostname: 'https://docs.deploy.my'
  },  
  srcExclude: ['**/README.md'],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
		logo: {
			light: '/img/deploymy-logo-transparent-22x24.webp',
			dark: '/img/deploymy-logo-transparent-22x24.webp',
      alt: 'Deploy.my Logo'
		}, 
    nav: [
      { text: 'Docker-To-IaC', link: '/docker-to-iac' },
      { text: 'Deploy.My', link: 'https://deploy.my' }
    ],
    sidebar: [
      {
        items: [ 
          {
            text: 'Introduction',
            link: '/docker-to-iac'
          },
          {
            text: 'Usage & Concept',
            base: '/docker-to-iac/',
            items: [
              { text: 'Quickstart', link: 'quickstart' },
              { text: 'API', link: 'api' },
              { text: 'Parser Explanation', link: 'parser-explanation' },
              { text: 'Multi Services Support', link: 'multi-services-support' }
            ]
          },
          {
            text: 'Parsers',
            base: '/docker-to-iac/',
            link: 'parser',
            items: [
              { text: 'AWS CloudFormation', link: 'parser/aws-cloudformation' },
              { text: 'Render.com', link: 'parser/render.com' }
            ]
          },
          {
            text: 'Development',
            base: '/docker-to-iac/',
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
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/deploymy' },
      { icon: 'github', link: 'https://github.com/deploymy' }
    ],
		search: {
			provider: 'local',
		},
		editLink: {
			pattern: 'https://github.com/deploymy/documentation/edit/main/:path',
			text: 'Edit on GitHub'
		},
		outline: {
			level: [2,3]
		},
    footer: {
      message: '<a target=_blank href="https://deploy.my">Deploy.my</a> Documentation',
      copyright: '<a target="_blank" rel="nofollow" href="https://deploy.my/privacy-policy">Privacy Policy</a> <strong>|</strong> <a target="_blank" rel="nofollow" href="https://deploy.my/cookie-policy">Cookie Policy</a>'
    }     
  }
})
