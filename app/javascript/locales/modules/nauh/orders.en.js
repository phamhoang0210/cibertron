
import { flattenMessages } from 'helpers/localeHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// NauhLeads language file used for internationalization

export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    attrs: {
      id: {
        // attrs.id.label
        label: 'Id',
      },
      created_at: {
        // attrs.created_at.label
        label: 'Created at'
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
          required: 'Campaign is required!'
        },
        placeholder: {
          select: {
            // attrs.campaign.placeholder.select.single
            single: 'Select campaign'
          }
        }
      },
      staff: {
        // attrs.staff.label
        label: 'Staff',
        placeholder: {
          select: {
            // attrs.staff.placeholder.select.all
            all: '-- All --',
          }
        }
      },
      created_at: {
        // attrs.created_at.label
        label: 'Created at'
      },
      actions: {
        // attrs.actions.label
        label: ' '
      },
      created_in: {
        // attrs.created_in.label
        label: 'Created in',
      },
      updated_in: {
        // attrs.updated_in.label
        label: 'Updated in',
      },
      name: {
        // attrs.name.label
        label: 'Name',
        errors: {
          // attrs.name.errors.required
          required: 'Name is required!'
        }
      },
      email: {
        // attrs.email.label
        label: 'Email',
        errors: {
          // attrs.email.errors.required
          required: 'Email is required!'
        }
      },
      mobile: {
        // attrs.mobile.label
        label: 'Mobile',
        errors: {
          // attrs.mobile.errors.required
          required: 'Mobile is required!'
        }
      },
      product: {
        // attrs.product.label
        label: 'Course',
        errors: {
          // attrs.product.errors.required
          required: 'Course is required!'
        },
        placeholder: {
          select: {
            // attrs.product.placeholder.select.single
            single: 'Select course'
          }
        }
      },
      promotion_price: {
        // attrs.promotion_price.label
        label: 'Promotion price',
        errors: {
          // attrs.promotion_price.errors.required
          required: 'Promotion price is required!'
        }
      },
      coupon_code: {
        // attrs.coupon_code.label
        label: 'Coupon code',
      },
      method_payment: {
        // attrs.method_payment.label
        label: 'Payment method',
        errors: {
          // attrs.method_payment.errors.required
          required: 'Payment method is required!',
        }
      },
      cod_adress: {
        // attrs.cod_adress.label
        label: 'Address',
        errors: {
          // attrs.cod_adress.errors.required
          required: 'Address is required!'
        }
      },
      cod_province: {
        // attrs.cod_province.label
        label: 'Province',
        errors: {
          // attrs.cod_province.errors.required
          required: 'Province is required!'
        },
        placeholder: {
          select: {
            // attrs.cod_province.placeholder.select.single
            single: 'Province is required!',
          }
        }
      },
      cod_district: {
        // attrs.cod_district.label
        label: 'District',
        errors: {
          // attrs.cod_district.errors.required
          required: 'District is required!',
          // attrs.cod_district.errors.not_in_province
          not_in_province: 'Selected district not in province'
        },
        placeholder: {
          select: {
            // attrs.cod_district.placeholder.select.single
            single: 'District is required!',
          }
        }
      },
      cod_expected_date: {
        // attrs.cod_expected_date.label
        label: 'Expected date',
        errors: {
          // attrs.cod_expected_date.errors.required
          required: 'Expected date is required',
        }
      },
      cod_receive_name: {
        // attrs.cod_receive_name.label
        label: 'Receiver name',
        errors: {
          // attrs.cod_receive_name.errors.required
          required: 'Receiver name is required',
        }
      },
      cod_receive_mobile: {
        // attrs.cod_receive_mobile.label
        label: 'Receiver mobile',
        errors: {
          // attrs.cod_receive_mobile.errors.required
          required: 'Receiver mobile is required',
        }
      },
      cod_note: {
        // attrs.cod_note.label
        label: 'Note',
      },
      transfer_bank: {
        // attrs.transfer_bank.label
        label: 'Bank',
        errors: {
          // attrs.transfer_bank.errors.required
          required: 'Bank is required',
        },
        placeholder: {
          // attrs.transfer_bank.placeholder.select.single
          select: {
            single: 'Select bank'
          }
        }
      },
      transfer_account_id: {
        // attrs.transfer_account_id.label
        label: 'Account number',
        errors: {
          // attrs.transfer_account_id.errors.required
          required: 'Account number is required',
        }
      },
      transfer_booking_transfer_date: {
        // attrs.transfer_booking_transfer_date.label
        label: 'Booking date',
        errors: {
          // attrs.transfer_booking_transfer_date.errors.required
          required: 'Booking date is required',
        }
      },
      transfer_receive_name: {
        // attrs.transfer_receive_name.label
        label: 'Receiver name',
        errors: {
          // attrs.transfer_receive_name.errors.required
          required: 'Receiver name is required',
        }
      },
      transfer_receive_mobile: {
        // attrs.transfer_receive_mobile.label
        label: 'Receiver mobile',
        errors: {
          // attrs.transfer_receive_mobile.errors.required
          required: 'Receiver mobile is required',
        }
      },
      transfer_other_note: {
        // attrs.transfer_other_note.label
        label: 'Note',
      },
      office_office_address: {
        // attrs.office_office_address.label
        label: 'Office adderss',
        errors: {
          // attrs.office_office_address.errors.required
          required: 'Office adderss is required',
        },
        placeholder: {
          // attrs.office_office_address.placeholder.select.single
          select: {
            single: 'Select office adderss'
          }
        }
      },
      office_booking_office_date: {
        // attrs.office_booking_office_date.label
        label: 'Booking date',
        errors: {
          // attrs.office_booking_office_date.errors.required
          required: 'Booking date is required',
        },
      },
      office_receive_name: {
        // attrs.office_receive_name.label
        label: 'Receiver name',
        errors: {
          // attrs.office_receive_name.errors.required
          required: 'Receiver name is required',
        },
      },
      office_receive_mobile: {
        // attrs.office_receive_mobile.label
        label: 'Receiver mobile',
        errors: {
          // attrs.office_receive_mobile.errors.required
          required: 'Receiver mobile is required',
        },
      },
      office_other_note: {
        // attrs.office_other_note.label
        label: 'Note',
      },
      one_pay_booking_onepay_date: {
        // attrs.one_pay_booking_onepay_date.label
        label: 'Booking date',
        errors: {
          // attrs.one_pay_booking_onepay_date.errors.required
          required: 'Booking date is required',
        }
      },
      one_pay_receive_name: {
        // attrs.one_pay_receive_name.label
        label: 'Receiver name',
        errors: {
          // attrs.one_pay_receive_name.errors.required
          required: 'Receiver name is required',
        },
      },
      one_pay_receive_mobile: {
        // attrs.one_pay_receive_mobile.label
        label: 'Receiver mobile',
        errors: {
          // attrs.one_pay_receive_mobile.errors.required
          required: 'Receiver mobile is required',
        },
      },
      one_pay_other_note: {
        // attrs.one_pay_other_note.label
        label: 'Note',
      }
    },
    index: {
      // index.title
      title: 'Orders',
      orders_table: {
        actions: {
          button: {
            // index.orders_table.actions.button.view_on_eros
            view_on_eros: 'View on Eros',
          }
        },
        tools: {
          search: {
            // index.orders_table.tools.search.placeholder
            placeholder: 'Search by email..'
          }
        }
      }
    },
    new: {
      // new.title
      title: 'Create new order',
    },
    edit: {
      // edit.title
      title: 'Update order',
    },
  }),
  antd: antdEn,
  locale: 'en-US',
}