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
        <p>Ethereum Network: Ropsten</p>
        <p>Exit Period: 86400 Seconds (1 day)</p>
        <p>
          Plasma Framework Address: 0xa72c9dceeef26c9d103d55c53d411c36f5cdf7ec
        </p>
      </Container>
    </div>
  );
}

module.exports = NetworkConnectionDetails;
