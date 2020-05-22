const React = require("react");

class Footer extends React.Component {
  render() {
    const { config: siteConfig } = this.props;
    const {
      blockExplorerUrl,
      watcherInfoAPIUrl,
      watcherSecurityAPIUrl,
      childChainAPIUrl,
    } = siteConfig;

    const state = {
      gettingStarted: [
        {
          content: "MoreVP Architecture",
          url: "morevp-technical-overview",
        },
        {
          content: "Web Wallet Quick Start",
          url: "quick-start-webwallet",
        },
        {
          content: "Web Wallet Code",
          url: "https://github.com/omgnetwork/web-wallet",
        },
        {
          content: "OMG Samples",
          url: "https://github.com/omgnetwork/omg-samples",
        },
      ],
      api: [
        {
          content: `Watcher\nInformational API`,
          url: watcherInfoAPIUrl,
        },
        {
          content: `Watcher\nSecurity Critical API`,
          url: watcherSecurityAPIUrl,
        },
        {
          content: `Child Chain API`,
          url: childChainAPIUrl,
        },
      ],
      docs: [
        {
          content: "Elixir-omg",
          url: "https://github.com/omgnetwork/elixir-omg/blob/master/README.md",
        },
        {
          content: "Omg-js",
          url: "https://github.com/omgnetwork/omg-js/blob/master/README.md",
        },
        {
          content: "Tutorials",
          url: "integration-introduction",
        },
        {
          content: "Plasma Contracts",
          url: "https://github.com/omgnetwork/plasma-contracts",
        },
      ],
      resources: [
        {
          content: "Block Explorer",
          url: blockExplorerUrl,
        },
        {
          content: "OMG Network",
          url: "https://www.omg.network",
        },
        {
          content: "Github",
          url: "https://github.com/omgnetwork",
        },
      ],
      social: [
        {
          url: "https://twitter.com/omgnetworkhq",
          src: "/img/twitter.svg",
          alt: "twitter",
        },
        {
          url: "https://www.linkedin.com/company/omgnetwork/",
          src: "/img/linkedin.svg",
          alt: "linkedin",
        },
        {
          url: "https://github.com/omgnetwork",
          src: "/img/github.svg",
          alt: "github",
        },
        {
          url: "https://reddit.com/r/omgnetwork",
          src: "/img/reddit.svg",
          alt: "reddit",
        },
        {
          url: "https://www.youtube.com/channel/UC-NfGRxTkJfVbFgyJoOxzCQ",
          src: "/img/youtube.svg",
          alt: "youtube",
        },
      ],
    };

    const FooterColumn = (props) => {
      return (
        <div className="footer-column">
          <span className="footer-title">{props.title}</span>
          {props.children}
        </div>
      );
    };

    const FooterColumnSocial = (props) => {
      return (
        <div className="footer-column">
          <span className="footer-title">{props.title}</span>
          <span className="footer-item">{props.children}</span>
        </div>
      );
    };

    const FooterItem = (props) => {
      return (
        <span className="footer-item">
          <a target="_blank" href={props.href}>
            {props.content}
          </a>
        </span>
      );
    };

    const FooterItemSocial = (props) => {
      return (
        <a target="_blank" href={props.href}>
          <img src={props.src} alt={props.alt} className="footer-social" />
        </a>
      );
    };

    return (
      <div className="footer-content">
        <div className="footer-wrapper">
          <FooterColumn title="Getting Started">
            {state.gettingStarted.map((item, key) => {
              return (
                <FooterItem
                  href={item.url}
                  content={item.content}
                  key={key}
                ></FooterItem>
              );
            })}
          </FooterColumn>
          <FooterColumn title="API References">
            {state.api.map((item, key) => {
              return (
                <FooterItem
                  href={item.url}
                  content={item.content}
                  key={key}
                ></FooterItem>
              );
            })}
          </FooterColumn>
          <FooterColumn title="Integration Docs">
            {state.docs.map((item, key) => {
              return (
                <FooterItem
                  href={item.url}
                  content={item.content}
                  key={key}
                ></FooterItem>
              );
            })}
          </FooterColumn>
          <FooterColumn title="Resources">
            {state.resources.map((item, key) => {
              return (
                <FooterItem
                  href={item.url}
                  content={item.content}
                  key={key}
                ></FooterItem>
              );
            })}
          </FooterColumn>

          <FooterColumnSocial
            title="Follow us"
          >
            {state.social.map((item, key) => {
              return (
                <FooterItemSocial
                  href={item.url}
                  src={item.src}
                  alt={item.alt}
                  key={key}
                ></FooterItemSocial>
              );
            })}
            <br /> <br />
            <span className="footer-copyright">
              {`© 2019-present OMG Network.\nAll rights reserved`}
            </span>
          </FooterColumnSocial>
        </div>
      </div>
    );
  }
}

module.exports = Footer;
