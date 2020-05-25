const React = require("react");
// const CompLibrary = require("../../core/CompLibrary.js");

// const Container = CompLibrary.Container;
// const GridBlock = CompLibrary.GridBlock;

class Environments extends React.Component {
  render() {
    const state = {
      environments: [
        {
          title: "Environment Name",
          ropsten: "OMG Network V1 Testnet",
          mainnet: "OMG Network V1 Mainnet",
          url: false,
        },
        {
          title: "Ethereum Network",
          ropsten: "Ropsten",
          mainnet: "Mainnet",
          url: false,
        },
        {
          title: "Exit Period",
          ropsten: "86400 Seconds (1 day)",
          mainnet: "604800 Seconds (1 week)",
          url: false,
        },
        {
          title: "Plasma Contracts",
          ropsten: "a69c763",
          mainnet: "a69c763",
          url: false,
        },
        {
          title: "Child Chain URL",
          ropsten: "https://childchain.ropsten.v1.omg.network",
          mainnet: "https://childchain.mainnet.v1.omg.network",
          url: true,
        },
        {
          title: "Watcher URL",
          ropsten: "https://watcher.ropsten.v1.omg.network",
          mainnet: "https://watcher.mainnet.v1.omg.network",
          url: true,
        },
        {
          title: "Watcher Info URL",
          ropsten: "https://watcher-info.ropsten.v1.omg.network",
          mainnet: "https://watcher-info.mainnet.v1.omg.network",
          url: true,
        },
        {
          title: "Block Explorer URL",
          ropsten: "https://blockexplorer.ropsten.v1.omg.network",
          mainnet: "https://blockexplorer.mainnet.v1.omg.network",
          url: true,
        },
        {
          title: "Web Wallet URL",
          ropsten: "https://webwallet.ropsten.v1.omg.network",
          mainnet: "https://webwallet.mainnet.v1.omg.network",
          url: true,
        },
        {
          title: "Authority Address",
          ropsten: "0xecec123f5cdbc0046a3e4d94223bb120dd3cb7b9",
          mainnet: "0x22405c1782913fb676bc74ef54a60727b0e1026f",
          url: false,
        },
        {
          title: "Ethereum Vault",
          ropsten: "0x895cc6f20d386f5c0deae08b08ccfec9f821e7d9",
          mainnet: "0x3eed23ea148d356a72ca695dbce2fceb40a32ce0",
          url: false,
        },
        {
          title: "ERC20 Vault",
          ropsten: "0x18e15c2cdc003b845b056f8d6b6a91ab33d3f182",
          mainnet: "0x070cb1270a4b2ba53c81cef89d0fd584ed4f430b",
          url: false,
        },
        {
          title: "Payment Exit Game",
          ropsten: "0x08c569c5774110eb84a80b292e6d6f039e18915a",
          mainnet: "0x48d7a6bbc428bca019a560cf3e8ea5364395aad3",
          url: false,
        },
        {
          title: "Plasma Franework Tx Hash",
          ropsten:
            "0x16eaebcf186bda5a662998475ea333d1c063fa27c051d0d0e4e33194f145b543",
          mainnet:
            "0x1c29b67acc33eba0d26f52a1e4d26625f52b53e6fbb0a4db915aeb052f7ec849",
          url: false,
        },
        {
          title: "Plasma Framework",
          ropsten: "0x96d5d8bc539694e5fa1ec0dab0e6327ca9e680f9",
          mainnet: "0x0d4c1222f5e839a911e2053860e45f18921d72ac",
          url: false,
        },
      ],
    };

    const Container = (props) => (
      <section className="fdb-block pt-4 text-dark-light">
        <div className="container">{props.children}</div>
      </section>
    );

    const EnvTable = (props) => (
      <table className="table table-responsive">
        <thead className="thead-light">
          <tr>
            <th scope="col">Value</th>
            <th scope="col">{props.header}</th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    );

    const EnvTableRow = (props) => (
      <tr>
        <th scope="row">{props.title}</th>
        {props.children}
      </tr>
    );

    const EnvTableColumn = (props) => (
      <td url={props.url}>
        {props.url ? (
          <a target="_blank" href={props.content}>
            {props.content}
          </a>
        ) : (
          props.content
        )}
      </td>
    );

    return (
      <Container>
        <h1>OMG Network V1 Testnet</h1>
        <EnvTable header="Ropsten">
          {state.environments.map((item, key) => {
            return (
              <EnvTableRow title={item.title} key={key}>
                <EnvTableColumn
                  content={item.ropsten}
                  url={item.url}
                  key={key}
                ></EnvTableColumn>
              </EnvTableRow>
            );
          })}
        </EnvTable>
        <h1>OMG Network V1 Mainnet</h1>
        <EnvTable header="Mainnet">
          {state.environments.map((item, key) => {
            return (
              <EnvTableRow title={item.title} key={key}>
                <EnvTableColumn
                  content={item.mainnet}
                  url={item.url}
                  key={key}
                ></EnvTableColumn>
              </EnvTableRow>
            );
          })}
        </EnvTable>
      </Container>
    );
  }
}

module.exports = Environments;
