const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function NetworkConnectionDetails(props) {
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <h1>OMG Network v1 Testnet</h1>
        <p>Plasma-Contracts: a69c763</p>
        <p>
          Child chain:{" "}
          <a
            target="_blank"
            href="https://childchain.ropsten.v1.omg.network"
          >
            https://childchain.ropsten.v1.omg.network
          </a>
        </p>
        <p>
          Watcher:{" "}
          <a
            target="_blank"
            href="https://watcher.ropsten.v1.omg.network"
          >
            https://watcher.ropsten.v1.omg.network
          </a>
        </p>
        <p>
          Watcher Info:{" "}
          <a
            target="_blank"
            href="https://watcher-info.ropsten.v1.omg.network"
          >
            https://watcher-info.ropsten.v1.omg.network
          </a>
        </p>
        <p>
          Blockexplorer:{" "}
          <a
            target="_blank"
            href="https://blockexplorer.ropsten.v1.omg.network"
          >
            https://blockexplorer.ropsten.v1.omg.network
          </a>
        </p>
        <p>
          Webwallet:{" "}
          <a
            target="_blank"
            href="https://webwallet.ropsten.v1.omg.network"
          >
          https://webwallet.ropsten.v1.omg.network
          </a>
        </p>
        <p>Ethereum Network: Ropsten</p>
        <p>Exit Period: 86400 Seconds (1 day)</p>
        <p>authority_address: 0xecec123f5cdbc0046a3e4d94223bb120dd3cb7b9</p>
        <p>eth_vault: 0x895cc6f20d386f5c0deae08b08ccfec9f821e7d9</p>
        <p>erc20_vault: 0x18e15c2cdc003b845b056f8d6b6a91ab33d3f182</p>
        <p>payment_exit_game: 0x08c569c5774110eb84a80b292e6d6f039e18915a</p>
        <p>plasma_framework_tx_hash: 0x16eaebcf186bda5a662998475ea333d1c063fa27c051d0d0e4e33194f145b543</p>
        <p>plasma_framework: 0x96d5d8bc539694e5fa1ec0dab0e6327ca9e680f9</p>
      </Container>
    </div>
  );
}

module.exports = NetworkConnectionDetails;
