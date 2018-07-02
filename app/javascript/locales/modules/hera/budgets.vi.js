import { flattenMessages } from 'helpers/applicationHelper'
import antdVi from 'antd/lib/locale-provider/vi_VN'
import commontAntdVi from 'locales/common/antd.vi'

// HeraDomains language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdVi,
    attrs: {
      date_create: {
        // attrs.id.label
        label: 'Ngày tạo',
      },
      email: {
        // attrs.name.label
        label: 'Email',
        errors: {
          // attrs.name.errors.required
          required: 'Email là trường bắt buộc',
        },
      },
      budget: {
        // attrs.dns_server.label
        label: 'Budget',
        errors: {
          // attrs.dns_server.errors.required
          required: 'Budget là trường bắt buộc'
        },
      },
      used_domain: {
        // attrs.landing_page_name.label
        label: 'Used domain',
        errors: {
          required: 'Used domain là trường bắt buộc'
        }
      },
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Bạn chắc chắn muốn xóa domain?',
        // popconfirm.delete.ok_text
        ok_text: 'OK',
        // popconfirm.delete.cancel_text
        cancel_text: 'Hủy',
      }
    },
    new: {
      // new.title
      title: 'Tạo mới Budgets',
    },
    edit: {
      // edit.title
      title: 'Cập nhật Budgets',
    },
    index: {
      // index.title
      title: 'Budgets',
      budget_table: {
        search: {
          // index.domains_table.search.placeholder
          placeholder: 'Tìm kiếm..',
        }
      }
    }
  }),
  antd: antdVi,
  locale: 'en-US',
}