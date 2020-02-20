// See https://docusaurus.io/docs/site-config for more options

const siteConfig = {
  docsSideNavCollapsible: true,
  disableHeaderTitle: true,
  gaTrackingId: 'GTM-TVZS27N',
  title: 'OMG Network',
  tagline: 'Documentation for the OMG Network',
  url: 'https://omisego.github.io',
  baseUrl: '/',
  docsUrl: '',
  projectName: 'omisego.github.co',
  organizationName: 'omisego',
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
    primaryColor: '#215cec',
    secondaryColor: '#2e374c',
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
