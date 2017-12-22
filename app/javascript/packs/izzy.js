import ReactOnRails from 'react-on-rails'
import IzzyCampaignsApp from 'modules/izzy/campaigns/registers/IzzyCampaignsApp'
import IzzyTemplatesApp from 'modules/izzy/templates/registers/IzzyTemplatesApp'
import IzzyListsApp from 'modules/izzy/lists/registers/IzzyListsApp'
import IzzySendersApp from 'modules/izzy/senders/registers/IzzySendersApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  IzzyCampaignsApp,
  IzzyTemplatesApp,
  IzzyListsApp,
  IzzySendersApp,
});
