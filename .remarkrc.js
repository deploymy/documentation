import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { visit } from 'unist-util-visit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const checkLocalLinks = () => (tree, file) => {
  visit(tree, 'link', (node) => {
    const url = node.url;
    if (url.startsWith('/docs/')) {
      // Split URL into file path and hash
      const [filePath] = url.split('#');
      const localPath = path.join(__dirname, filePath);
      if (!fs.existsSync(localPath)) {
        file.message(`Local file does not exist: ${filePath}`, node);
      }
    }
  });
};

export default {
  plugins: [
    [
      'remark-lint-no-dead-urls',
      {
        skipLocalLinks: false,
        skipOffline: false,
        timeout: 5000,
        skipUrlPatterns: [
          'discord.gg',
          /^\/docs\/.*/
        ]
      }
    ],
    checkLocalLinks
  ]
};
