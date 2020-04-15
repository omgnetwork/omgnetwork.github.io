const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

class Header extends React.Component {
  render() {
    const { siteConfig } = this.props;
    const { baseUrl } = siteConfig;

    const HeaderContainer = (props) => (
      <div className="promoSection homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = (props) => (
      <div>
        <h2 className="projectTitle text-dark-light">{props.title}</h2>
        <p className="text-smoke text-md">
          {props.content}
          Learn how to integrate OMG Network to create more efficient <br />
          financial and blockchain applications.
        </p>
      </div>
    );

    const Logo = (props) => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const CTASection = (props) => (
      <div className="promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className={props.style} href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <HeaderContainer>
        <div className="inner" align="left">
          <ProjectTitle title="OMG Developer Portal" />
          <Logo img_src={`${baseUrl}img/dev/dev01.svg`} />
        </div>
        <CTASection>
          <Button style="button button-primary" href={"quick-start-webwallet"}>
            Get Started
          </Button>
          <Button style="button button-dark" href="">
            Subscribe
          </Button>
        </CTASection>
      </HeaderContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const state = {
      coreDocs: [
        {
          title: "Getting Started",
          content: "Create your first transaction on the network.",
          url: "quick-start-webwallet",
          imageLink: `${baseUrl}img/dev/dev02.svg`,
        },
        {
          title: "Integration",
          content: "Browse code samples for integration purposes.",
          url: "integration-introduction",
          imageLink: `${baseUrl}img/dev/dev03.svg`,
        },
        {
          title: "Blockchain Design",
          content: "Learn about technical implementation of the OMG Network.",
          url: "blockchain-design",
          imageLink: `${baseUrl}img/dev/dev04.svg`,
        },
        {
          title: "Block Explorer",
          content: "Watch the latest blocks and transactions on the network.",
          url: "https://blockexplorer.ropsten.v1.omg.network",
          imageLink: `${baseUrl}img/dev/dev05.svg`,
        },
      ],
      apiDocs: [
        {
          title: "Watcher Informational API",
          content:
            "Access general information the Watcher collects about the OMG Network.",
          url:
            "https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs",
          imageLink: `${baseUrl}img/dev/dev06.svg`,
        },
        {
          title: "Watcher Security Critical API",
          content:
            "Work with security-critical functions provided by the Watcher.",
          url:
            "https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Fsecurity_critical_api_specs",
          imageLink: `${baseUrl}img/dev/dev07.svg`,
        },
        {
          title: "Child Chain API",
          content: "Perform basic operations on the OMG Network.",
          url: "https://docs.omg.network/elixir-omg/docs-ui",
          imageLink: `${baseUrl}img/dev/dev08.svg`,
        },
      ],
    };

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className={props.style} href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const Card = (props) => {
      return (
        <div className="card shadow-3d">
          <a href={props.url}>
            <div className="card-body">
              <img src={props.imageLink} />
              <h2 className="text-center">
                <a className="text-dark-light" href={props.url}>
                  {props.title}
                </a>
              </h2>
            </div>
            <div className="card-footer text-muted text-sm font-weight-bold">
              <span className="float-right">{props.content}</span>
            </div>
          </a>
        </div>
      );
    };

    const CardsContainer = (props) => (
      <Container padding={["bottom"]}>
        <h1 className="text-dark-light text-lg">
          <img src={props.titleImage} />
          {props.title}
        </h1>
        <div className="promoSection">
          <div className="promoRow">
            <div className="pluginRowBlock">{props.children}</div>
          </div>
        </div>
      </Container>
    );

    const Announcement = () => (
      <div className="announcement">
        <div className="announcement-inner">
          <h1>OMG Network V1 Private Beta</h1>
          <p>
            We have deployed the newest version of the OMG Network on Ethereum
            Mainnet.
          </p>
          <Button style="button button-primary" href={"quick-start-webwallet"}>
            Get Started
          </Button>
        </div>
      </div>
    );

    return (
      <div>
        <Header siteConfig={siteConfig} language={language} />
        <CardsContainer title="First Steps">
          {state.coreDocs.map((item, key) => {
            return (
              <Card
                title={item.title}
                content={item.content}
                imageLink={item.imageLink}
                url={item.url}
              ></Card>
            );
          })}
        </CardsContainer>
        <Announcement />
        <CardsContainer title="API references">
          {state.apiDocs.map((item, key) => {
            return (
              <Card
                title={item.title}
                content={item.content}
                imageLink={item.imageLink}
                url={item.url}
              ></Card>
            );
          })}
        </CardsContainer>
      </div>
    );
  }
}

module.exports = Index;
