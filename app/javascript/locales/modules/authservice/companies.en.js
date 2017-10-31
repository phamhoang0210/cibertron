import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    attrs: {
      
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
    },
    edit: {
      // edit.title
      title: 'Update company'
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}