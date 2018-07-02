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
      last_action_by: {
        // attrs.last_action_by.label
        label: 'Cập nhật',
      },
      subject: {
        // attrs.subject.label
        label: 'Subject',
        errors: {
        // attrs.subject.errors.required
          required: 'Subject là trường bắt buộc'
        }
      },
      name: {
        // attrs.name.label
        label: 'Tên campaign',
        errors: {
        // attrs.name.errors.required
          required: 'Tên là trường bắt buộc'
        }
      },
      list: {
        // attrs.list.label
        label: 'List',
        errors: {
        // attrs.list.errors.required
          required: 'List là trường bắt buộc'
        },
        // attrs.list.placeholder
        placeholder: 'Chọn list email',
      },
      sender: {
        // attrs.sender.label
        label: 'Sender',
        errors: {
        // attrs.sender.errors.required
          required: 'Sender là trường bắt buộc'
        },
        // attrs.sender.placeholder
        placeholder: 'Chọn sender',
      },
      template: {
        // attrs.template.label
        label: 'Template',
        errors: {
        // attrs.template.errors.required
          required: 'Template là trường bắt buộc'
        },
        // attrs.template.placeholder
        placeholder: 'Chọn template',
      },
      test_emails: {
        // attrs.test_emails.label
        label: 'Email test',
        // attrs.test_emails.tool_tip
        tool_tip: 'Các email cách nhau bằng dấu ;'
      },
      open_percent: {
        // attrs.open.label
        label: 'Mở(%)',
      },
    },

    actions: {
      send_test: {
        // actions.send_test.label
        label: 'Send test'
      }
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Bạn có chắc muốn xóa contact này?',
        // popconfirm.delete.ok_text
        ok_text: 'Ok',
        // popconfirm.delete.cancel_text
        cancel_text: 'Cancel',
      },
      send: {
        // popconfirm.send.title
        title: 'Bạn có chắc muốn gửi?',
        // popconfirm.send.ok_text
        ok_text: 'Ok',
        // popconfirm.send.cancel_text
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
      title: 'Tạo campaign',
    },
    edit: {
      // edit.title
      title: 'Cập nhật thông tin campaign',
    },


  }),
  antd: antdVi,
  locale: 'en-US',
}