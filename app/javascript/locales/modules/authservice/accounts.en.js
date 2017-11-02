import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    attrs: {
      id: {
        // attrs.id.label
        label: 'Id',
      },
      name: {
        // attrs.name.label
        label: 'Name',
      },
      email: {
        // attrs.email.label
        label: 'Email',
        errors: {
          // attrs.email.errors.required
          required: 'Email is required'
        }
      },
      role: {
        // attrs.role.label
        label: 'Role',
        placeholder: {
          select: {
            // attrs.role.placeholder.select.single
            single: 'Select role'
          }
        }
      },
      adminrole: {
        // attrs.adminrole.label
        label: 'Admin role',
        placeholder: {
          select: {
            single: {
              // attrs.adminrole.placeholder.select.single
              label: 'Select admin role'
            }
          }
        }
      },
      department: {
        // attrs.department.label
        label: 'Department',
        errors: {
          // attrs.department.errors.required
          required: 'Department is required',
        },
        placeholder: {
          select: {
            // attrs.department.placeholder.select.single
            single: 'Select department',
          }
        }
      },
      company: {
        // attrs.company.label
        label: 'Company',
      },
      actions: {
        // attrs.actions.label
        label: ' ',
      },
      password: {
        // attrs.password.label
        label: 'Password',
        errors: {
          // attrs.password.errors.required
          required: 'Password is required'
        }
      },
      password_confirmation: {
        // attrs.password_confirmation.label
        label: 'Password confirmation',
        errors: {
          // attrs.password_confirmation.errors.required
          required: 'Password confirmation is required'
        }
      }
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this account?',
        // popconfirm.delete.ok_text
        ok_text: 'Yes',
        // popconfirm.delete.cancel_text
        cancel_text: 'No'
      }
    },
    new: {
      // new.title
      title: 'Create new account'
    },
    index: {
      // index.title
      title: 'Accounts',
      accounts_table: {
        tools: {
          search: {
            // index.accounts_table.tools.search.placeholder
            placeholder: 'Search by name, email..',
          }
        }
      },
    },
    edit: {
      // edit.title
      title: 'Update account',
      tabs: {
        tab: {
          update_infomation: {
            // edit.tabs.tab.update_infomation.title
            title: 'Update infomation',
          },
          update_role: {
            // edit.tabs.tab.update_role.title
            title: 'Update role',
          },
          change_password: {
            // edit.tabs.tab.change_password.title
            title: 'Change password',
          },
        }
      }
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}