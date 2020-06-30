// See https://docusaurus.io/docs/site-config for more options

const siteConfig = {
  docsSideNavCollapsible: true,
  disableHeaderTitle: true,
  gaTrackingId: "UA-154130721-1",
  gaGtag: true,
  title: "OMG Network",
  tagline: "Documentation for the OMG Network",
  url: "https://omgnetwork.github.io",
  baseUrl: "/",
  docsUrl: "",
  cname: "docs.omg.network",
  projectName: "omgnetwork.github.io",
  organizationName: "omgnetwork",
  headerLinks: [
    { doc: "welcome", label: "Docs" },
    { doc: "api", label: "APIs" },
    { doc: "environments", label: "Environments" },
    { href: "https://omg.network", external: true, label: "Product" },
  ],
  headerIcon: "img/logo/omg-white.svg",
  footerIcon: "img/favicon.ico",
  favicon: "img/favicon.ico",
  colors: {
    primaryColor: "#215cec",
    secondaryColor: "#2e374c",
  },
  scripts: [
    'js/typeform.js',
    'js/g-tag.js',
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-block-buttons.js',
    'js/intercom.js',
  ],
  stylesheets: ['/css/code-block-buttons.css', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'],
  // wrapPagesHTML: true,
  onPageNav: "separate",
  cleanUrl: true,
  algolia: {
    apiKey: "af8e7b1e7bcb8af0f31e1c3aca2f8d16",
    indexName: "omisego",
  },
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "dracula",
  },
  docsSideNavCollapsible: false,
  // Open Graph and Twitter card images.
  ogImage: "img/logo/omg-blue.svg",
  twitterImage: "img/logo/omg-blue.svg",
  // Show documentation's last contributor's name.
  enableUpdateBy: false,
  enableUpdateTime: false,
  // omg urls
  gettingStartedUrl: "welcome",
  blockExplorerUrl: "https://omg.eco/blockexplorer",
  webWalletUrl: "https://omg.eco/webwallet",
  watcherInfoAPIUrl:
    "https://docs.omg.network/elixir-omg/docs-ui/?urls.primaryName=master%2Finfo_api_specs",
  watcherSecurityAPIUrl:
    "https://docs.omg.network/elixir-omg/docs-ui/?urls.primaryName=master%2Fsecurity_critical_api_specs",
  childChainAPIUrl: "https://docs.omg.network/elixir-omg/docs-ui/",
  omgJsAPIUrl: "https://docs.omg.network/omg-js"
};

module.exports = siteConfig;
