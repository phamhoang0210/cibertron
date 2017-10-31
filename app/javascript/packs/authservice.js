import ReactOnRails from 'react-on-rails'
import AuthserviceDepartmentsApp from 'modules/authservice/departments/registers/AuthserviceDepartmentsApp'
import AuthserviceAccountsApp from 'modules/authservice/accounts/registers/AuthserviceAccountsApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  AuthserviceDepartmentsApp,
  AuthserviceAccountsApp,
});
