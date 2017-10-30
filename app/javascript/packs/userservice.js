import ReactOnRails from 'react-on-rails'
import UserserviceDepartmentsApp from 'modules/userservice/departments/registers/UserserviceDepartmentsApp'
import UserserviceAccountsApp from 'modules/userservice/accounts/registers/UserserviceAccountsApp'
import UserserviceUsersApp from 'modules/userservice/users/registers/UserserviceUsersApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  UserserviceDepartmentsApp,
  UserserviceAccountsApp,
  UserserviceUsersApp,
});
