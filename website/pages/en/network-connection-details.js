const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function NetworkConnectionDetails (props) {
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <h1>OMG Network v1 Testnet</h1>
        <p>Plasma-Contracts: 7c3f796</p>
        <p>Child chain: <a target='_blank' href='https://prod-7c3f796-childchain-ropsten-01.omg.network'>https://prod-7c3f796-childchain-ropsten-01.omg.network</a></p>
        <p>Watcher: <a target='_blank' href='https://prod-7c3f796-watcher-ropsten-01.omg.network'>https://prod-7c3f796-watcher-ropsten-01.omg.network</a></p>
        <p>Blockexplorer: <a target='_blank' href='https://prod-7c3f796-blockexplorer-ropsten-01.omg.network'>https://prod-7c3f796-blockexplorer-ropsten-01.omg.network</a></p>
        <p>Ethereum Network: Ropsten</p>
        <p>Exit Period: 86400 Seconds (1 day)</p>
        <p>Plasma Framework Address: 0xc7c671ee646a6da78c341d18c4734c80dd818599</p>
      </Container>
    </div>
  );
}

module.exports = NetworkConnectionDetails;


CI/CD: Disabled

Plasma-contracts: 7c3f796

Child chain: https://prod-7c3f796-childchain-ropsten-01.omg.network/

Watcher: https://prod-7c3f796-watcher-ropsten-01.omg.network/

Watcher-Info: https://prod-7c3f796-watcher-info-ropsten-01.omg.network/

Contract Transactions: https://ropsten.etherscan.io/address/0xc7c671ee646a6da78c341d18c4734c80dd818599

Deployed on: Feb-19-2020 07:58:25 AM +UTC

Ethereum Network: Ropsten

Exit Period: 86400 Seconds (1 days)

{
  "authority_address": "0x3c3beee95a1bafdbf0c0ca20cf57483720c591da",
  "eth_vault": "0xef3181b2ec80650c36dd8372f39854850d20b7e5",
  "erc20_vault": "0x1658aafc3191e004933284981c29bb8e5b95ddaf",
  "payment_exit_game": "0x333c3cc6e1208d44ade0d8abe7d62b372c1ac3bd",
  "plasma_framework_tx_hash": "0xcabc571504889f9494b7c89914af14281c37aca7e4c50a4cfda7efdee9821cae",
  "plasma_framework": "0xc7c671ee646a6da78c341d18c4734c80dd818599"
}