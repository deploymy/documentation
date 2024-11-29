import { URL } from 'url';

export default {
  names: ['absolute-links'],
  description: 'Links should be absolute and start with /docs/',
  tags: ['links'],
  function: function rule(params, onError) {
    params.tokens
      .filter(token => token.type === 'inline' && token.children)
      .forEach(token => {
        token.children
          .filter(child => child.type === 'link_open')
          .forEach(link => {
            const href = link.attrs.find(attr => attr[0] === 'href');
            if (href) {
              const url = href[1];
              // Skip external links (http/https) and anchor links (#)
              if (!url.startsWith('http') && !url.startsWith('#')) {
                // Check if it's not an absolute path starting with /docs/
                if (!url.startsWith('/docs/')) {
                  onError({
                    lineNumber: token.lineNumber,
                    detail: `Link "${url}" should be absolute and start with /docs/`,
                    context: token.line
                  });
                }
              }
            }
          });
      });
  }
};
