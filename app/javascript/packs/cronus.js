import ReactOnRails from 'react-on-rails'
import CronusChannelsApp from 'modules/cronus/channels/registers/CronusChannelsApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  CronusChannelsApp,
});
