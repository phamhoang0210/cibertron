
import { flattenMessages } from 'helpers/localeHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    attrs: {
      id: {
        // attrs.id.label
        label: 'Name',
      },
      name: {
        // attrs.name.label
        label: 'Name',
        errors: {
          // attrs.name.errors.required
          required: 'Name is required!',
        }
      },
      code: {
        // attrs.code.label
        label: 'Code',
        errors: {
          // attrs.code.errors.required
          required: 'Code is required!',
        }
      },
      about: {
        // attrs.about.label
        label: 'Code',
      },
      actions: {
        // attrs.actions.label
        label: ' ',
      }
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this provider?',
        // popconfirm.delete.ok_text
        ok_text: 'Ok',
        // popconfirm.delete.cancel_text
        cancel_text: 'Cancel',
      }
    },
    new: {
      // new.title
      title: 'Create new provider',
    },
    index: {
      // index.title
      title: 'Providers',
      providers_table: {
        tools: {
          search: {
            // index.providers_table.tools.search.placeholder
            placeholder: 'Search by code..',
          }
        }
      }
    },
    edit: {
      // edit.title
      title: 'Update provider',
    },
  }),
  antd: antdEn,
  locale: 'en-US',
}
