import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    label: {
      attrs: {
        id: 'ID',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        name: "Name",
        email: "Email",
      },
      modules: {
        accounts: 'Accounts',
      }
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}