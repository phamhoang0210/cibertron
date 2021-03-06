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
        password: "Password",
        Confirm: "Confirm",
      },
      modules: {
        accounts: 'Accounts',
        accountCreate: "Create Account",
        editAccount: "Edit Account",
      }
    },
    form: {
      button: {
        cancel: 'Cancel',
        create: "Create",
        update: "Update",
        delete: "Delete",
        ok: "Ok",
        new: 'New',
        searchName: "Search By Name",
      }
    },
    errors: {
      valid:{
        email: "The input is not valid E-mail!",
      },
      required: {
        email: "Email name is Required!",
        name: "Name is Required!",
        password: "Password is Required",
        passwordConfirm: "Confirm is Require",
      },
      length: {
        email: "The email is too long! please enter again",
        name: "The Name is too long! please enter again",
        password: "The Password is to long! Please enter again",
      }
    },
    success: {
      created:{
        account: "Create account successfully",
      },
      update:{
        account: "Update successfully",
      }
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}