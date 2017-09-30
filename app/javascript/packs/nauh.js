import ReactOnRails from 'react-on-rails'
import NauhLeadsApp from 'modules/nauh/leads/registers/NauhLeadsApp'
import NauhOrdersApp from 'modules/nauh/orders/registers/NauhOrdersApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  NauhLeadsApp,
  NauhOrdersApp,
});
