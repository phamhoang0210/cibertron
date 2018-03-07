import { flattenMessages } from 'helpers/applicationHelper'
import antdVi from 'antd/lib/locale-provider/vi_VN'
import commontAntdVi from 'locales/common/antd.vi'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdVi,
    attrs: {
      
      created_at: {
        // attrs.created_at.label
        label: 'Ngày tạo',
      },
      opened_at: {
        // attrs.opened_at.label
        label: 'Ngày mở',
      },
      email: {
        // attrs.email.label
        label: 'Email'
      },
      status: {
        // attrs.status.label
        label: 'Status'
      },
      sender: {
        // attrs.sender.label
        label: 'Sender'
      },
      group: {
        // attrs.group.label
        label: 'Group'
      },
      error: {
        // attrs.error.label
        label: 'Error'
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
      title: 'Logs',
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