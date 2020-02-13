const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function NetworkConnectionDetails (props) {
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <h1>Lumphini ODP Test Network</h1>
        <p>Plasma-contracts: xxx</p>
        <p>Child chain: <a target='_blank' href='https://childchain-lumphini.omg.network'>https://childchain-lumphini.omg.network</a></p>
        <p>Watcher: <a target='_blank' href='https://watcher-lumphini.omg.network'>https://watcher-lumphini.omg.network</a></p>
        <p>Blockexplorer: <a target='_blank' href='https://quest-lumphini.omg.network'>https://quest-lumphini.omg.network</a></p>
        <p>Ethereum Network: Ropsten</p>
        <p>Exit Period: 86400 Seconds (1 day)</p>
        <p>Plasma Framework Address: 0x24e0b6b701c941824b3eedc041f50be6e15bfdeb</p>
      </Container>
    </div>
  );
}

module.exports = NetworkConnectionDetails;
