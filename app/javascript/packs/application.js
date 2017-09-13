import ReactOnRails from 'react-on-rails'
import DashboardApp from 'modules/dashboard/registers/DashboardApp'
import AuthApp from 'modules/auth/registers/AuthApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  DashboardApp,
  AuthApp,
});
