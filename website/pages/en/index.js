const React = require("react");

class Header extends React.Component {
  render() {
    const { siteConfig } = this.props;
    const { baseUrl, gettingStartedUrl } = siteConfig;

    const HeaderContainer = (props) => (
      <section className="home">
        <div className="container">{props.children}</div>
      </section>
    );

    const HeaderTitle = (props) => (
      <div>
        <h1 className="text-dark-light projectTitle">{props.title}</h1>
        <p className="text-smoke text-md mt-4">{props.subtitle}</p>
      </div>
    );

    const HeaderRow = (props) => (
      <div className={props.className}>{props.children}</div>
    );

    const HeaderColumn = (props) => (
      <div className={props.className}>{props.children}</div>
    );

    const Button = (props) => (
      <a className={props.className} href={props.href}>
        {props.title}
      </a>
    );

    const Image = (props) => (
      <img alt="image" className={props.className} src={props.src} />
    );

    return (
      <HeaderContainer>
        <HeaderRow className="row align-items-center mt-5">
          <HeaderColumn className="col-12 col-sm-12 col-md-7 col-lg-6 pb-5 pb-md-0 pl-sm-0">
            <HeaderTitle
              title="OMG Developer Portal"
              subtitle="Learn how to integrate OMG Network to create more efficient financial
          and blockchain applications."
            ></HeaderTitle>
            <div className="mt-4">
              <Button
                className="button button-primary"
                href="/welcome"
                title="Get Started"
              ></Button>
              <Button
                className="button button-dark typeform-share"
                href="https://omisego-dp.typeform.com/to/T8dDjF"
                title="Sign Up"
              ></Button>
            </div>
          </HeaderColumn>
          <HeaderColumn className="col-10 col-sm-6 col-md-5 col-lg-4 m-auto pb-5 pb-md-0">
            <Image
              className="img-fluid rounded-0 d-none d-lg-block"
              src="./img/dev/dev01.svg"
            ></Image>
          </HeaderColumn>
        </HeaderRow>
      </HeaderContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const {
      baseUrl,
      blockExplorerUrl,
      webWalletUrl,
      watcherInfoAPIUrl,
      watcherSecurityAPIUrl,
      childChainAPIUrl,
      omgJsAPIUrl,
    } = siteConfig;

    const state = {
      integrationTools: [
        {
          title: "Tutorials",
          content:
            "Learn technical implementation of the OMG Network features.",
          url: "integration-introduction",
          imageLink: `${baseUrl}img/icons/01.svg`,
        },
        {
          title: "Block Explorer",
          content: "Watch the latest blocks and transactions on the network.",
          url: `${blockExplorerUrl}`,
          imageLink: `${baseUrl}img/icons/02.svg`,
        },
        {
          title: "Web Wallet",
          content: "Deposit funds and transact on the OMG Network.",
          url: `${webWalletUrl}`,
          imageLink: `${baseUrl}img/icons/03.svg`,
        },
        {
          title: "Plasma Contracts",
          content: "Browse smart contracts that power the network.",
          url: "https://github.com/omisego/plasma-contracts",
          imageLink: `${baseUrl}img/icons/04.svg`,
        },
        {
          title: "Elixir-omg",
          content:
            "Run Watcher and Child Chain server locally.",
          url: "https://github.com/omisego/elixir-omg",
          imageLink: `${baseUrl}img/icons/05.svg`,
        },
      ],
      codeSamples: [
        {
          title: "React Starter Kit",
          content: "Interact with the OMG network from your browser.",
          url: "https://github.com/omisego/react-starter-kit",
          imageLink: `${baseUrl}img/icons/06.svg`,
        },
        {
          title: "OMG Samples",
          content: "Browse and run locally various code samples.",
          url: "https://github.com/omisego/omg-samples",
          imageLink: `${baseUrl}img/icons/07.svg`,
        },
      ],
      apiDocs: [
        {
          title: "Watcher Informational API",
          content: "Retrieve and submit data regardless of the OMG Network.",
          url: `${watcherInfoAPIUrl}`,
        },
        {
          title: "Watcher Security Critical API",
          content:
            "Work with security-critical functions provided by the Watcher.",
          url: `${watcherSecurityAPIUrl}`,
        },
        {
          title: "Child Chain API",
          content: "Access the data you need to run your own Watcher.",
          url: `${childChainAPIUrl}`,
        },
        {
          title: "Omg-js API",
          content: "Access and use modules of the the omg-js library.",
          url: `${omgJsAPIUrl}`,
        },
      ],
    };

    const Block = (props) => (
      <section className="fdb-block pt-4 text-dark-light">
        <div className="container">{props.children}</div>
      </section>
    );

    const CardsContainer = (props) => (
      <div>
        <div className="row">
          <div className="col-12 pl-sm-0">
            <h2>{props.blockTitle}</h2>
          </div>
        </div>
        <div className="row text-left mt-3">{props.children}</div>
      </div>
    );

    const ImagedCard = (props) => {
      return (
        <div className="col-12 col-md-4 mb-3">
          <a href={props.url} target="_blank">
            <div className="row box">
              <div className="col-3 d-none d-lg-block align-self-center">
                <img alt="image" className="fdb-icon mx-auto" src={props.imageLink} />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-9">
                <h3>{props.title}</h3>
                <p>{props.content}</p>
              </div>
            </div>
          </a>
        </div>
      );
    };

    const CalloutCard = (props) => {
      return (
        <div className="col-12 col-md-4 mb-3">
          <a href={props.url} target="_blank">
            <div className="row box callout callout-primary">
              <div className="col-12 pb-2">
                <h3>{props.title}</h3>
                <p>{props.content}</p>
              </div>
            </div>
          </a>
        </div>
      );
    };

    return (
      <div>
        <Header siteConfig={siteConfig} language={language} />
        <Block>
          <CardsContainer blockTitle="Integration Docs & Tools">
            {state.integrationTools.map((item, key) => {
              return (
                <ImagedCard
                  title={item.title}
                  content={item.content}
                  imageLink={item.imageLink}
                  url={item.url}
                ></ImagedCard>
              );
            })}
          </CardsContainer>
          <CardsContainer blockTitle="Code Samples">
            {state.codeSamples.map((item, key) => {
              return (
                <ImagedCard
                  title={item.title}
                  content={item.content}
                  imageLink={item.imageLink}
                  url={item.url}
                ></ImagedCard>
              );
            })}
          </CardsContainer>
          <CardsContainer blockTitle="API References">
            {state.apiDocs.map((item, key) => {
              return (
                <CalloutCard
                  title={item.title}
                  content={item.content}
                  imageLink={item.imageLink}
                  url={item.url}
                ></CalloutCard>
              );
            })}
          </CardsContainer>
        </Block>
      </div>
    );
  }
}

module.exports = Index;
