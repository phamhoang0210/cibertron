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
        errors: {
          // attrs.name.errors.required
          required: 'Name is required'
        }
      },
      description: {
        // attrs.description.label
        label: 'Description',
      },
      actions: {
        // attrs.actions.label
        label: ' ',
      },
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this company?',
        // popconfirm.delete.ok_text
        ok_text: 'Yes',
        // popconfirm.delete.cancel_text
        cancel_text: 'No'
      }
    },
    new: {
      // new.title
      title: 'Create new company'
    },
    index: {
      // index.title
      title: 'Companies',
      companies_table: {
        tools: {
          search: {
            // index.companies_table.tools.search.placeholder
            placeholder: 'Search by name, description..',
          }
        }
      },
    },
    edit: {
      // edit.title
      title: 'Update company'
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}