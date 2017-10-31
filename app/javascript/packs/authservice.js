import ReactOnRails from 'react-on-rails'
import AuthserviceDepartmentsApp from 'modules/authservice/departments/registers/AuthserviceDepartmentsApp'
import AuthserviceAccountsApp from 'modules/authservice/accounts/registers/AuthserviceAccountsApp'
import AuthserviceCompaniesApp from 'modules/authservice/companies/registers/AuthserviceCompaniesApp'
import AuthserviceRolesApp from 'modules/authservice/roles/registers/AuthserviceRolesApp'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  AuthserviceDepartmentsApp,
  AuthserviceAccountsApp,
  AuthserviceCompaniesApp,
  AuthserviceRolesApp,
});
