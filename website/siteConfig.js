// See https://docusaurus.io/docs/site-config for more options

const siteConfig = {
  docsSideNavCollapsible: true,
  disableHeaderTitle: true,
  gaTrackingId: 'UA-154130721-1',
  gaGtag: true,
  title: 'OMG Network | Documentation',
  tagline: 'Documentation for the OMG Network',
  url: 'https://nicholasmueller.github.io',
  baseUrl: '/',
  docsUrl: '',
  projectName: 'nicholasmueller.github.io',
  organizationName: 'nicholasmueller',
  headerLinks: [
    { doc: 'welcome', label: 'Docs' },
    { href: 'network-connection-details', external: false, label: 'Network Connection' },
    { doc: 'api-reference-introduction', label: 'API' },
    { href: 'https://omisego.co/', external: true, label: 'Product' },
  ],
  headerIcon: 'img/omg-network.svg',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',
  colors: {
    primaryColor: '#4967FF',
    secondaryColor: '#4967FF',
  },
  scripts: [],
  onPageNav: 'separate',
  cleanUrl: true,
  algolia: {
    apiKey: 'af8e7b1e7bcb8af0f31e1c3aca2f8d16',
    indexName: 'omisego'
  },
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },
  // Open Graph and Twitter card images.
  ogImage: 'img/omisego-blue.svg',
  twitterImage: 'img/omisego-blue.svg',

  // Show documentation's last contributor's name.
  enableUpdateBy: false,
  enableUpdateTime: false,
};

module.exports = siteConfig;
