import ReactOnRails from 'react-on-rails'
import AuthApp from 'modules/auth/registers/AuthApp'
import CronusChannelsApp from 'modules/cronus/channels/registers/CronusChannelsApp'
import CronusCategoriesApp from 'modules/cronus/categories/registers/CronusCategoriesApp'
import CronusProvidersApp from 'modules/cronus/providers/registers/CronusProvidersApp'
import CronusNodesApp from 'modules/cronus/nodes/registers/CronusNodesApp'
import CronusCampaignsApp from 'modules/cronus/campaigns/registers/CronusCampaignsApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  AuthApp,
  CronusChannelsApp,
  CronusCategoriesApp,
  CronusProvidersApp,
  CronusNodesApp,
  CronusCampaignsApp,
});
