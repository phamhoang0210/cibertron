import ReactOnRails from 'react-on-rails'
import HeraLandingPagesApp from 'modules/hera/landing_pages/registers/HeraLandingPagesApp'
import HeraDomainsApp from 'modules/hera/domains/registers/HeraDomainsApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HeraLandingPagesApp,
  HeraDomainsApp,
});
