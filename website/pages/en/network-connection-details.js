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
        <p>authority_address: 0x7c2d896dad820fe0f38d0aab057164c87101f973</p>
        <p>eth_vault: 0x2c7533f76567241341d1c27f0f239a20b6115714</p>
        <p>erc20_vault: 0x2bed2ff4ee93a208edbf4185c7813103d8c4ab7f</p>
        <p>payment_exit_game: 0x960ca6b9faa85118ba6badbe0097b1afd8827fac</p>
        <p>plasma_framework_tx_hash: 0x25e445594f425a7a94141a20b8831580953b92ddd0d12e9c775c571e4f3da08c</p>
        <p>plasma_framework: 0xa72c9dceeef26c9d103d55c53d411c36f5cdf7ec</p>
      </Container>
    </div>
  );
}

module.exports = NetworkConnectionDetails;
