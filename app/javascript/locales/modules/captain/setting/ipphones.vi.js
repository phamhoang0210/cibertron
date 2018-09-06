import { flattenMessages } from 'helpers/applicationHelper'
import antdVi from 'antd/lib/locale-provider/vi_VN'
import commontAntdVi from 'locales/common/antd.vi'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdVi,
    attrs: {
      id: {
        // attrs.id.label
        label: 'Id',
      },
      user_id: {
        // attrs.user_id.label
        label: 'Nhân viên',
        errors: {
          // attrs.user_id.errors.required
          required: 'Nhân viên là trường bắt buộc',
        },
        placeholder: {
          select: {
            // attrs.user_id.placeholder.select.single
            single: 'Chọn nhân viên'
          }
        }
      },
      station_id: {
        // attrs.station_id.label
        label: 'Ipphone',
        errors: {
          // attrs.station_id.errors.required
          required: 'Số ipphone là trường bắt buộc',
        },
      }
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this ipphone?',
        // popconfirm.delete.ok_text
        ok_text: 'Yes',
        // popconfirm.delete.cancel_text
        cancel_text: 'No'
      }
    },
    new: {
      // new.title
      title: 'Cài đặt Ipphone'
    },
    index: {
      // index.title
      title: 'Ipphones',
      ipphones_table: {
        tools: {
          search: {
            // index.ipphones_table.tools.search.placeholder
            placeholder: 'Search by ipphone number..',
          }
        }
      }
    },
    edit: {
      // edit.title
      title: 'Cập nhật cài đặt Ipphone'
    }
  }),
  antd: antdVi,
  locale: 'en-US',
}