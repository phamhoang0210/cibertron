import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// HeraDomains language file used for internationalization
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
        label: 'Domain',
        errors: {
          // attrs.name.errors.required
          required: 'Domain is required',
        },
      },
      username: {
        // attrs.user_id.label
        label: 'Owner',
      },
      dns_server: {
        // attrs.dns_server.label
        label: 'Target server',
        errors: {
          // attrs.dns_server.errors.required
          required: 'Target server is required'
        },
      },
      swap_domain: {
        // attrs.swap_domain.label
        label: 'Swap domain',
      },
      landing_page_name: {
        // attrs.landing_page_name.label
        label: 'Landing page name',
      },
      type: {
        // attrs.type.label
        label: 'Type',
      }
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this domain?',
        // popconfirm.delete.ok_text
        ok_text: 'Yes',
        // popconfirm.delete.cancel_text
        cancel_text: 'No',
      }
    },
    new: {
      // new.title
      title: 'Create new domain',
    },
    edit: {
      // edit.title
      title: 'Update domain',
    },
    restore: {
      // restore.title
      title: 'Restore domain',
    },
    index: {
      // index.title
      title: 'Domains',
      domains_table: {
        search: {
          // index.domains_table.search.placeholder
          placeholder: 'Search by code..',
        }
      }
    },
    history: {
      //history.title
      title: "History",
      history_table: {
        time: 'Time created',
        user: 'User',
        old_status: 'Old Status',
        new_status: 'New Status',
      }
    },
    version: {
      create_by: 'Create By',
      version_name: 'Version Name'
    }, 
  }),
  antd: antdEn,
  locale: 'en-US',
}