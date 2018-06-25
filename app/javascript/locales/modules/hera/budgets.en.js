import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_VN'
import commontAntdEn from 'locales/common/antd.en'

// HeraDomains language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    attrs: {
      date_create: {
        // attrs.id.label
        label: 'Date create',
      },
      email: {
        // attrs.name.label
        label: 'Email',
        errors: {
          // attrs.name.errors.required
          required: 'Email is field binding',
        },
      },
      budget: {
        // attrs.dns_server.label
        label: 'Budget',
        errors: {
          // attrs.dns_server.errors.required
          required: 'Budget is field binding'
        },
      },
      used_domain: {
        // attrs.landing_page_name.label
        label: 'Used domain',
        errors: {
          required: 'Used domain is field binding'
        }
      },
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Do you want delete domain?',
        // popconfirm.delete.ok_text
        ok_text: 'OK',
        // popconfirm.delete.cancel_text
        cancel_text: 'Delete',
      }
    },
    new: {
      // new.title
      title: 'Create new Budgets',
    },
    edit: {
      // edit.title
      title: 'Update Budgets',
    },
    index: {
      // index.title
      title: 'Budgets',
      budget_table: {
        search: {
          // index.domains_table.search.placeholder
          placeholder: 'Search..',
        }
      }
    }
  }),
  antd: antdVi,
  locale: 'en-US',
}