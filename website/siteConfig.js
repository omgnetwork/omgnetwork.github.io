// See https://docusaurus.io/docs/site-config for more options

const siteConfig = {
  disableHeaderTitle: true,
  title: 'OmiseGO | Developer Portal',
  tagline: 'Documentation for OmiseGo',
  url: 'https://omisego.github.io',
  baseUrl: '/',
  projectName: 'omisego.github.co',
  organizationName: 'omisego',
  docsUrl: '',
  headerLinks: [
    { doc: 'welcome', label: 'Docs' },
    { doc: 'api-reference-introduction', label: 'API' },
    { href: 'http://quest.samrong.omg.network/', external: true, label: 'Block explorer' },
    { href: 'https://omisego.co/use-cases', external: true, label: 'Use cases' },
    { href: 'https://omisego.co/', external: true, label: 'Product' },
  ],
  headerIcon: 'img/omisego-white.svg',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',
  colors: {
    primaryColor: '#215cec',
    secondaryColor: '#2e374c',
  },
  scripts: [],
  onPageNav: 'separate',
  cleanUrl: true,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },
  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: false,
  enableUpdateTime: false,
};

module.exports = siteConfig;
