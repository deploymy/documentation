import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: "Deploy.my / Docs",
  cleanUrls: true,
  description: "Deploy.my Full Documentation and API",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
		logo: {
			light: '/img/deploymy-logo-transparent-22x24.webp',
			dark: '/img/deploymy-logo-transparent-22x24.webp'
		},    
    nav: [
      { text: 'Docker-To-IaC', link: '/docker-to-iac' },
      { text: 'Deploy.My', link: 'https://deploy.my' }
    ],
    sidebar: [
      {
        items: [ 
          {
            text: 'Usage',
            base: '/docker-to-iac/',
            items: [
              { text: 'Quickstart', link: 'quickstart' },
              { text: 'API', link: 'api' },
              { text: 'Supported Languages', link: 'supported-languages' }
            ]
          },
          {
            text: 'Development',
            base: '/docker-to-iac/',
            items: [
              { text: 'Project Structure', link: 'project-structure' },
              { text: 'Testing', link: 'testing' },
              { text: 'Example of a New Parser', link: 'example-of-a-new-parser' }
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
		}    
  }
})
