import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// Userservice User language file used for internationalization
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
        label: 'Email'
      },
      mobile: {
        // attrs.mobile.label
        label: 'Mobile'
      },
      first_name: {
        // attrs.mobile.label
        label: 'First name'
      },
      last_name: {
        // attrs.mobile.label
        label: 'Last name'
      },
    },

    index: {
      // index.title
      title: 'Users',
      users_table: {
        tools: {
          search: {
            // index.users_table.tools.search.placeholder
            placeholder: 'Search by Topica account..',
          }
        }
      },
    },
    edit: {
      // edit.title
      title: 'Update user',
      tabs: {
        tab: {
          update_infomation: {
            // edit.tabs.tab.update_infomation.title
            title: 'Update infomation',
          },
        }
      }
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}