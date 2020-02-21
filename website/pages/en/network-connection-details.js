const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function NetworkConnectionDetails(props) {
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <h1>OMG Network v1 Testnet</h1>
        <p>Plasma-Contracts: 7c3f796</p>
        <p>
          Child chain:{" "}
          <a
            target="_blank"
            href="https://prod-7c3f796-childchain-ropsten-01.omg.network"
          >
            https://prod-7c3f796-childchain-ropsten-01.omg.network
          </a>
        </p>
        <p>
          Watcher:{" "}
          <a
            target="_blank"
            href="https://prod-7c3f796-watcher-ropsten-01.omg.network"
          >
            https://prod-7c3f796-watcher-ropsten-01.omg.network
          </a>
        </p>
        <p>
          Blockexplorer:{" "}
          <a
            target="_blank"
            href="https://prod-7c3f796-blockexplorer-ropsten-01.omg.network"
          >
            https://prod-7c3f796-blockexplorer-ropsten-01.omg.network
          </a>
        </p>
        <p>Ethereum Network: Ropsten</p>
        <p>Exit Period: 86400 Seconds (1 day)</p>
        <p>
          Plasma Framework Address: 0xc7c671ee646a6da78c341d18c4734c80dd818599
        </p>
      </Container>
    </div>
  );
}

module.exports = NetworkConnectionDetails;
