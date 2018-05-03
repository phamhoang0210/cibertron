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
      created_at: {
        // attrs.created_at.label
        label: 'Ngày tạo',
      },
      lead: {
        // attrs.lead.label
        label: 'Lead',
      },
      campaign: {
        // attrs.campaign.label
        label: 'Campaign',
        errors: {
          // attrs.campaign.errors.required
          required: 'Campaign là trường bắt buộc!'
        },
        placeholder: {
          select: {
            // attrs.campaign.placeholder.select.single
            single: 'Chọn campaign'
          }
        }
      },
      order_level_code: {
        // attrs.order_level_code.label
        label: 'Level',
      },
      order_level_id: {
        // attrs.order_level_id.label
        label: 'Level',
        placeholder: {
          select: {
            // attrs.order_level_id.placeholder.select.all
            all: '-- Tất cả --',
          }
        }
      },
      payment_method: {
        // attrs.payment_method.label
        label: 'Thanh toán',
        placeholder: {
          select: {
            // attrs.payment_method.placeholder.select.all
            all: '-- Tất cả --'
          }
        }
      },
      staff: {
        // attrs.staff.label
        label: 'Nhân viên',
        placeholder: {
          select: {
            // attrs.staff.placeholder.select.all
            all: '-- Tất cả --',
          }
        }
      },
      created_at: {
        // attrs.created_at.label
        label: 'Thời gian tạo'
      },
      actions: {
        // attrs.actions.label
        label: ' '
      },
      created_in: {
        // attrs.created_in.label
        label: 'Thời gian tạo',
      },
      updated_in: {
        // attrs.updated_in.label
        label: 'Thời gian cập nhật',
      },
      name: {
        // attrs.name.label
        label: 'Tên',
        errors: {
          // attrs.name.errors.required
          required: 'Tên là trường bắt buộc!'
        }
      },
      email: {
        // attrs.email.label
        label: 'Email',
        errors: {
          // attrs.email.errors.required
          required: 'Email là trường bắt buộc!'
        }
      },
      mobile: {
        // attrs.mobile.label
        label: 'Mobile',
        errors: {
          // attrs.mobile.errors.required
          required: 'Mobile là trường bắt buộc!'
        }
      },
      product: {
        // attrs.product.label
        label: 'Khóa học',
        errors: {
          // attrs.product.errors.required
          required: 'Khóa học là trường bắt buộc!'
        },
        placeholder: {
          select: {
            // attrs.product.placeholder.select.single
            single: 'Chọn khóa học'
          }
        }
      },
      promotion_price: {
        // attrs.promotion_price.label
        label: 'Gía bán',
        errors: {
          // attrs.promotion_price.errors.required
          required: 'Gía khuyến mại là trường bắt buộc!'
        }
      },
      coupon_code: {
        // attrs.coupon_code.label
        label: 'Mã gỉam gía',
      },
    },
    index: {
      // index.title
      title: 'Đơn hàng',
      orders_table: {
        actions: {
          button: {
            // index.orders_table.actions.button.view_on_eros
            view_on_eros: 'Xem trên Eros',
          }
        },
        tools: {
          search: {
            // index.orders_table.tools.search.placeholder
            placeholder: 'Tìm theo email..'
          }
        }
      },
      filters_form: {
        form_item: {
          button: {
            export: {
              // index.filters_form.form_item.button.export.text
              text: "Xuất ({numOfItem})",
            }
          }
        }
      }
    },
    new: {
      // new.title
      title: 'Tạo mới đơn hàng',
    },
    edit: {
      // edit.title
      title: 'Cập nhật đơn hàng',
    },
  }),
  antd: antdVi,
  locale: 'en-US',
}