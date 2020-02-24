const React = require('react');

function Footer() {
  return (
    <div className='footer-content'>
      <div className='footer-wrapper'>
        <div className='footer-column'>
          <span className='footer-title'>Getting Started</span>
          <span className='footer-item'>
            <a
              target='_blank'
              href='https://github.com/omisego/dev-portal/blob/master/guides/morevp_eli5.md'
            >
              {`Learn MoreVP\nArchitecture`}
            </a>
          </span>
          <span className='footer-item'>
            <a
              target='_blank'
              href='https://github.com/omisego/dev-portal/blob/master/guides/plasma_interface_from_browser.md'
            >
              {`Get to know\nthe Plasma Interface`}
            </a>
          </span>
        </div>

        <div className='footer-column'>
          <span className='footer-title'>APIs</span>
          <span className='footer-item'>
            <a
              target='_blank'
              href='https://developer.omisego.co/elixir-omg/docs-ui/?url=master%2Fsecurity_critical_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs'
            >
              {`Watcher\nInformational API`}
            </a>
          </span>
          <span className='footer-item'>
            <a
              target='_blank'
              href='https://developer.omisego.co/elixir-omg/docs-ui/?url=master%2Fsecurity_critical_api_specs.yaml&urls.primaryName=master%2Fsecurity_critical_api_specs'
            >
              {`Watcher\nSecurity Critical API`}
            </a>
          </span>
          <span className='footer-item'>
            <a
              target='_blank'
              href='https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/operator_api_specs.yaml'
            >
              {`Child Chain API`}
            </a>
          </span>
        </div>

        <div className='footer-column'>
          <span className='footer-title'>Documentation</span>
          <span className='footer-item'>
            <a
              target='_blank'
              href='https://github.com/omisego/elixir-omg/blob/master/README.md'
            >
              {`OMG Network`}
            </a>
          </span>
          <span className='footer-item'>
            <a
              target='_blank'
              href='https://github.com/omisego/omg-js/blob/master/README.md'
            >
              {`omg-js`}
            </a>
          </span>
        </div>

        <div className='footer-column'>
          <span className='footer-title'>Links</span>
          <span className='footer-item'>
            <a
              target='_blank'
              href='https://prod-7c3f796-blockexplorer-ropsten-01.omg.network'
            >
              {`Block Explorer`}
            </a>
          </span>
          <span className='footer-item'>
            <a target='_blank' href='https://omisego.co/'>
              {`OmiseGO`}
            </a>
          </span>
          <span className='footer-item'>
            <a target='_blank' href='https://github.com/omisego'>
              {`GitHub`}
            </a>
          </span>
        </div>

        <div className='footer-column' style={{ position: 'relative' }}>
          <span className='footer-title'>Follow us</span>

          <span className='footer-item'>
            <a target='_blank' href='https://twitter.com/omise_go'>
              <img
                src='/img/twitter.svg'
                alt='twitter'
                className='footer-social'
              />
            </a>
            <a target='_blank' href='https://www.linkedin.com/company/omisego/'>
              <img
                src='/img/linkedin.svg'
                alt='linkedin'
                className='footer-social'
              />
            </a>
            <a target='_blank' href='https://github.com/omisego'>
              <img
                src='/img/github.svg'
                alt='github'
                className='footer-social'
              />
            </a>
            <a target='_blank' href='https://reddit.com/r/omise_go/'>
              <img
                src='/img/reddit.svg'
                alt='reddit'
                className='footer-social'
              />
            </a>
            <a
              target='_blank'
              href='https://www.youtube.com/channel/UC-NfGRxTkJfVbFgyJoOxzCQ'
            >
              <img
                src='/img/youtube.svg'
                alt='youtube'
                className='footer-social'
              />
            </a>
          </span>

          <span className='footer-copyright'>
            {`© 2019-present OmiseGO.\nAll rights reserved`}
          </span>
        </div>
      </div>
    </div>
  );
}

module.exports = Footer;
