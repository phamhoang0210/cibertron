import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    attrs: {
      id: {
        // atts.id.label
        label: 'Id',
      },
      name: {
        // atts.name.label
        label: 'Name',
      },
      level: {
        // atts.level.label
        label: 'Level',
      },
      actions: {
        // atts.actions.label
        label: ' ',
      },
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this role?',
        // popconfirm.delete.ok_text
        ok_text: 'Yes',
        // popconfirm.delete.cancel_text
        cancel_text: 'No'
      }
    },
    new: {
      // new.title
      title: 'Create new role'
    },
    index: {
      // index.title
      title: 'Roles',
      roles_table: {
        tools: {
          search: {
            // index.roles_table.tools.search.placeholder
            placeholder: 'Search by name..'
          }
        }
      }
    },
    edit: {
      // edit.title
      title: 'Update role'
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}