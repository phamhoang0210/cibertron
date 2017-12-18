import ReactOnRails from 'react-on-rails'
import IzzyCampaignsApp from 'modules/izzy/campaigns/registers/IzzyCampaignsApp'
import IzzyTemplatesApp from 'modules/izzy/templates/registers/IzzyTemplatesApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  IzzyCampaignsApp,
  IzzyTemplatesApp,
});
