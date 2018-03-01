import ReactOnRails from 'react-on-rails'
import EesCampaignsApp from 'modules/ees/campaigns/registers/EesCampaignsApp'
import EesTemplatesApp from 'modules/ees/templates/registers/EesTemplatesApp'
import EesListsApp from 'modules/ees/lists/registers/EesListsApp'
import EesSendersApp from 'modules/ees/senders/registers/EesSendersApp'
import EesLogsApp from 'modules/ees/logs/registers/EesLogsApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  EesCampaignsApp,
  EesTemplatesApp,
  EesListsApp,
  EesSendersApp,
  EesLogsApp,
});
