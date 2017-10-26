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
        label: 'Phương thức thanh toán'
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
      method_payment: {
        // attrs.method_payment.label
        label: 'Payment method',
        errors: {
          // attrs.method_payment.errors.required
          required: 'Phương thức thanh toán là trường bắt buộc!',
        }
      },
      cod_adress: {
        // attrs.cod_adress.label
        label: 'Địa chỉ',
        errors: {
          // attrs.cod_adress.errors.required
          required: 'Địa chỉ là trường bắt buộc!'
        }
      },
      cod_province: {
        // attrs.cod_province.label
        label: 'Tỉnh',
        errors: {
          // attrs.cod_province.errors.required
          required: 'Tỉnh là trường bắt buộc!'
        },
        placeholder: {
          select: {
            // attrs.cod_province.placeholder.select.single
            single: 'Tỉnh là trường bắt buộc!',
          }
        }
      },
      cod_district: {
        // attrs.cod_district.label
        label: 'Huyện',
        errors: {
          // attrs.cod_district.errors.required
          required: 'Huyện là trường bắt buộc!',
          // attrs.cod_district.errors.not_in_province
          not_in_province: 'Huyện đã chọn không nằm trong tỉnh'
        },
        placeholder: {
          select: {
            // attrs.cod_district.placeholder.select.single
            single: 'Huyện là trường bắt buộc!',
          }
        }
      },
      cod_expected_date: {
        // attrs.cod_expected_date.label
        label: 'Thời gian mong muốn',
        errors: {
          // attrs.cod_expected_date.errors.required
          required: 'Thời gian mong muốn là trường bắt buộc',
        }
      },
      cod_receive_name: {
        // attrs.cod_receive_name.label
        label: 'Tên người nhận',
        errors: {
          // attrs.cod_receive_name.errors.required
          required: 'Tên người nhận là trường bắt buộc',
        }
      },
      cod_receive_mobile: {
        // attrs.cod_receive_mobile.label
        label: 'Số điện thoại người nhận',
        errors: {
          // attrs.cod_receive_mobile.errors.required
          required: 'Số điện thoại người nhận là trường bắt buộc',
        }
      },
      cod_note: {
        // attrs.cod_note.label
        label: 'Note',
      },
      transfer_bank: {
        // attrs.transfer_bank.label
        label: 'Ngân hàng',
        errors: {
          // attrs.transfer_bank.errors.required
          required: 'Ngân hàng là trường bắt buộc',
        },
        placeholder: {
          // attrs.transfer_bank.placeholder.select.single
          select: {
            single: 'Chọn ngân hàng'
          }
        }
      },
      transfer_account_id: {
        // attrs.transfer_account_id.label
        label: 'Số tài khoản',
        errors: {
          // attrs.transfer_account_id.errors.required
          required: 'Số tài khoản là trường bắt buộc',
        }
      },
      transfer_booking_transfer_date: {
        // attrs.transfer_booking_transfer_date.label
        label: 'Ngày hẹn',
        errors: {
          // attrs.transfer_booking_transfer_date.errors.required
          required: 'Ngày hẹn là trường bắt buộc',
        }
      },
      transfer_receive_name: {
        // attrs.transfer_receive_name.label
        label: 'Tên người nhận',
        errors: {
          // attrs.transfer_receive_name.errors.required
          required: 'Tên người nhận là trường bắt buộc',
        }
      },
      transfer_receive_mobile: {
        // attrs.transfer_receive_mobile.label
        label: 'Số điện thoại người nhận',
        errors: {
          // attrs.transfer_receive_mobile.errors.required
          required: 'Số điện thoại người nhận là trường bắt buộc',
        }
      },
      transfer_other_note: {
        // attrs.transfer_other_note.label
        label: 'Note',
      },
      office_office_address: {
        // attrs.office_office_address.label
        label: 'Văn phòng',
        errors: {
          // attrs.office_office_address.errors.required
          required: 'Văn phòng là trường bắt buộc',
        },
        placeholder: {
          // attrs.office_office_address.placeholder.select.single
          select: {
            single: 'Chọn văn phòng'
          }
        }
      },
      office_booking_office_date: {
        // attrs.office_booking_office_date.label
        label: 'Ngày hẹn',
        errors: {
          // attrs.office_booking_office_date.errors.required
          required: 'Ngày hẹn là trường bắt buộc',
        },
      },
      office_receive_name: {
        // attrs.office_receive_name.label
        label: 'Tên người nhận',
        errors: {
          // attrs.office_receive_name.errors.required
          required: 'Tên người nhận là trường bắt buộc',
        },
      },
      office_receive_mobile: {
        // attrs.office_receive_mobile.label
        label: 'Số điện thoại người nhận',
        errors: {
          // attrs.office_receive_mobile.errors.required
          required: 'Số điện thoại người nhận là trường bắt buộc',
        },
      },
      office_other_note: {
        // attrs.office_other_note.label
        label: 'Note',
      },
      one_pay_booking_onepay_date: {
        // attrs.one_pay_booking_onepay_date.label
        label: 'Ngày hẹn',
        errors: {
          // attrs.one_pay_booking_onepay_date.errors.required
          required: 'Ngày hẹn là trường bắt buộc',
        }
      },
      one_pay_receive_name: {
        // attrs.one_pay_receive_name.label
        label: 'Tên người nhận',
        errors: {
          // attrs.one_pay_receive_name.errors.required
          required: 'Tên người nhận là trường bắt buộc',
        },
      },
      one_pay_receive_mobile: {
        // attrs.one_pay_receive_mobile.label
        label: 'Số điện thoại người nhận',
        errors: {
          // attrs.one_pay_receive_mobile.errors.required
          required: 'Số điện thoại người nhận là trường bắt buộc',
        },
      },
      one_pay_other_note: {
        // attrs.one_pay_other_note.label
        label: 'Note',
      }
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