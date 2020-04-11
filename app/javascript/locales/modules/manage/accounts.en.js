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
        password: "Password"
      },
      modules: {
        accounts: 'Accounts',
        accountCreate: "Create Account",
      }
    },
    form: {
      button: {
        cancel: 'Cancel',
        create: "Create",
      }
    },
    errors: {
      valid:{
        email: "The input is not valid E-mail!",
      },
      required: {
        email: "Email name is Required!",
        name: "Name is Required!",
      },
      length: {
        email: "The email is too long! please enter again",
        name: "The Name is too long! please enter again",
      }
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}