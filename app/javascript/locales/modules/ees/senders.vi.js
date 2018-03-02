import { flattenMessages } from 'helpers/applicationHelper'
import antdVi from 'antd/lib/locale-provider/vi_VN'
import commontAntdVi from 'locales/common/antd.vi'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdVi,
    attrs: {
      
      created_in: {
        // attrs.created_in.label
        label: 'Ngày tạo',
      },
      creator: {
        // attrs.creator.label
        label: 'Người tạo',
      },
      email: {
        // attrs.email.label
        label: 'Email',
        errors: {
        // attrs.email.errors.required
          required: 'Email là trường bắt buộc'
        }
      },
      name: {
        // attrs.name.label
        label: 'Tên',
        errors: {
        // attrs.name.errors.required
          required: 'Name là trường bắt buộc'
        }
      },
      budget: {
        // attrs.budget.label
        label: 'Budget',
        errors: {
        // attrs.budget.errors.required
          required: 'Budget là trường bắt buộc'
        }
      },
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Bạn có chắc muốn xóa contact này?',
        // popconfirm.delete.ok_text
        ok_text: 'Ok',
        // popconfirm.delete.cancel_text
        cancel_text: 'Cancel',
      }
    },
    index: {
      // index.title
      title: 'Campaigns',
      filters_form: {
        form_item: {
          button: {
            export: {
              // index.filters_form.form_item.button.export.text
              text: 'Xuất ({numOfItem})',
            },
          },
        },
      },
      campaigns_table: {
      },
    },
    new: {
      // new.title
      title: 'Tạo sender',
    },
    edit: {
      // edit.title
      title: 'Cập nhật thông tin sender',
    },

  }),
  antd: antdVi,
  locale: 'en-US',
}