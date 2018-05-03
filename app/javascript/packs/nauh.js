import ReactOnRails from 'react-on-rails'
import NauhLeadsApp from 'modules/nauh/leads/registers/NauhLeadsApp'
import NauhOrdersApp from 'modules/nauh/orders/registers/NauhOrdersApp'
import NauhSourcesApp from 'modules/nauh/sources/registers/NauhSourcesApp'
import NauhSettingsIpphonesApp from 'modules/nauh/settings/ipphones/registers/NauhSettingsIpphonesApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  NauhLeadsApp,
  NauhOrdersApp,
  NauhSourcesApp,
  NauhSettingsIpphonesApp,
});
