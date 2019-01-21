import { flattenMessages } from 'helpers/applicationHelper'
import antdVi from 'antd/lib/locale-provider/vi_VN'
import commontAntdVi from 'locales/common/antd.vi'

// HeraDomains language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdVi,
    attrs: {
      id: {
        // attrs.id.label
        label: 'Id',
      },
      name: {
        // attrs.name.label
        label: 'Domain',
        errors: {
          // attrs.name.errors.required
          required: 'Domain là trường bắt buộc',
        },
      },
      dns_server: {
        // attrs.dns_server.label
        label: 'Target server',
        errors: {
          // attrs.dns_server.errors.required
          required: 'Target server là trường bắt buộc'
        },
      },
      swap_domain: {
        // attrs.swap_domain.label
        label: 'Swap domain',
      },
      username: {
        // attrs.user_id.label
        label: 'Sở hữu',
      },
      landing_page_name: {
        // attrs.landing_page_name.label
        label: 'Tên landing page',
      },
      type: {
        // attrs.type.label
        label: 'Loại',
      },
      backup_index: {
        // attrs.backup_index.label
        label: 'Backup Index'
      },
      backup_thankyou: {
        // attrs.backup_thankyou.label
        label: 'Backup Thankyou'
      }
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
      title: 'Tạo mới domain',
    },
    edit: {
      // edit.title
      title: 'Cập nhật domain',
    },
    restore: {
      // restore.title
      title: 'Cập nhật domain',
    },
    index: {
      // index.title
      title: 'Domains',
      domains_table: {
        search: {
          // index.domains_table.search.placeholder
          placeholder: 'Tìm kiếm..',
        }
      }
    },
    others: {
      aws: 'http://s3.ap-southeast-1.amazonaws.com/edumall-landingpage/landingpages'
    }
  }),
  antd: antdVi,
  locale: 'en-US',
}