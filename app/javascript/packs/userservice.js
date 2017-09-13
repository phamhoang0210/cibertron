import ReactOnRails from 'react-on-rails'
import AuthApp from 'modules/auth/registers/AuthApp'
import UserserviceDepartmentsApp from 'modules/userservice/departments/registers/UserserviceDepartmentsApp'
import UserserviceAccountsApp from 'modules/userservice/accounts/registers/UserserviceAccountsApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  AuthApp,
  UserserviceDepartmentsApp,
  UserserviceAccountsApp,
});
