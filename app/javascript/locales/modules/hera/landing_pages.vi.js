import { flattenMessages } from 'helpers/applicationHelper'
import antdVi from 'antd/lib/locale-provider/vi_VN'
import commontAntdVi from 'locales/common/antd.vi'

// HeraLandingPages language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdVi,
    attrs: {
      name: {
        // attrs.name.label
        label: 'Tên',
        errors: {
          // attrs.name.errors.required
          required: 'Tên là trường bắt buộc'
        }
      },
      created_at: {
        // attrs.created_at.label
        label: 'Ngày tạo',
      },
      created_in: {
        // attrs.created_in.label
        label: 'Ngày tạo',
      },
      updated_in: {
        // attrs.updated_in.label
        label: 'Ngày cập nhật',
      },
      domain_id: {
        // attrs.domain_id.label
        label: 'Domain',
      },
      discount_id: {
        // attrs.discount_id.label
        label: 'Discount',
        errors: {
          // attrs.discount_id.errors.required
          required: 'Discount là trường bắt buộc',
        },
        placeholder: {
          select: {
            // attrs.discount_id.placeholder.select.all
            all: '-- Tất cả --',
          }
        }
      },
      strategy: {
        // attrs.strategy.label
        label: 'Strategy',
        errors: {
          // attrs.strategy.errors.required
          required: 'Strategy là trường bắt buộc'
        },
      },
      ga_code: {
        // attrs.ga_code.label
        label: 'Ga code',
      },
      thankyou_page_url: {
        // attrs.thankyou_page_url.label
        label: 'Url trang thankyou',
      },
      landing_page_type: {
        // attrs.landing_page_type.label
        label: 'Loại landingpage',
        errors: {
          // attrs.landing_page_type.errors.required
          required: 'Loại landingpage là trường bắt buộc'
        }
      },
      facebook_app_id: {
        // attrs.facebook_app_id.label
        label: 'Facebook app',
      },
      facebook_pixel_code_id: {
        // attrs.facebook_pixel_code_id.label
        label: 'Facebook pixel code',
      },
      user_id: {
        // attrs.user_id.label
        label: 'Người tạo',
      },
      product: {
        // attrs.product.label
        label: 'Khóa học',
      },
      landing_page_log: {
        attrs: {
          created_at: {
            // attrs.landing_page_log.attrs.created_at.label
            label: 'Ngày tạo',
          },
          user_id: {
            // attrs.landing_page_log.attrs.user_id.label
            label: 'Người thực hiện',
          },
          actions: {
            // attrs.landing_page_log.attrs.actions.label
            label: ' ',
          },
          domain_id_changes: {
            // attrs.landing_page_log.attrs.domain_id_changes.label
            label: 'Thay đổi domain',
          },
          discount_id_changes: {
            // attrs.landing_page_log.attrs.discount_id_changes.label
            label: 'Thay đổi discount',
          },
        }
      }
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Bạn chắc chắn muốn xóa landing page này?',
        // popconfirm.delete.ok_text
        ok_text: 'OK',
        // popconfirm.delete.cancel_text
        cancel_text: 'Hủy',
      },
    },
    new: {
      // new.title
      title: 'Tạo mới landing page',
    },
    edit: {
      // edit.title
      title: 'Cập nhật landing page',
    },
    index: {
      // index.title
      title: 'Landing Pages',
      landing_pages_table: {
        search: {
          // index.landing_pages_table.search.placeholder
          placeholder: 'Tìm kiếm theo tên..',
        },
        expanded_row: {
          tabs: {
            tab: {
              landing_page_logs: {
                // index.landing_pages_table.expanded_row.tabs.tab.landing_page_logs.title
                title: 'Lịch sử cập nhật',
              }
            }
          }
        }
      }
    },
    pagespeed_insight: {
      title: 'Gợi ý tối ưu tốc độ',
    },
    get_codes: {
      // get_codes.title
      title: 'Lấy mã landing page',
      code_tabs: {
        tab: {
          logic_home: {
            // get_codes.code_tabs.tab.logic_home.title
            title: 'Logic home'
          },
          logic_thankyou: {
            // get_codes.code_tabs.tab.logic_thankyou.title
            title: 'Logic thankyou'
          },
          form: {
            // get_codes.code_tabs.tab.form.title
            title: 'Form'
            
          },
          countdown: {
            // get_codes.code_tabs.tab.countdown.title
            title: 'Countdown'
          },
          facebook_comment: {
            // get_codes.code_tabs.tab.facebook_comment.title
            title: 'Facebook comment'
          },
        }
      }
    }
  }),
  antd: antdVi,
  locale: 'en-US',
}