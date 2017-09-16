import ReactOnRails from 'react-on-rails'
import CronusChannelsApp from 'modules/cronus/channels/registers/CronusChannelsApp'
import CronusCategoriesApp from 'modules/cronus/categories/registers/CronusCategoriesApp'
import CronusProvidersApp from 'modules/cronus/providers/registers/CronusProvidersApp'
import CronusNodesApp from 'modules/cronus/nodes/registers/CronusNodesApp'
import CronusCampaignsApp from 'modules/cronus/campaigns/registers/CronusCampaignsApp'
import CronusCampaignBydatesApp from 'modules/cronus/campaign_bydates/registers/CronusCampaignBydatesApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  CronusChannelsApp,
  CronusCategoriesApp,
  CronusProvidersApp,
  CronusNodesApp,
  CronusCampaignsApp,
  CronusCampaignBydatesApp,
});
