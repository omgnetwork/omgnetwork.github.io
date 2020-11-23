const React = require("react");

class NotFoundPage extends React.Component {
  render() {
    return (
      <body>
        <meta httpEquiv="refresh" content="0; url = https://docs.omg.network" />
        <p className="mx-auto my-6 container">You're being redirected to <a href="https://docs.omg.network">docs.omg.network</a></p>
      </body>
    )
  }
}

module.exports = NotFoundPage;
