import { flattenMessages } from 'helpers/applicationHelper'
import antdVi from 'antd/lib/locale-provider/vi_VN'
import commontAntdVi from 'locales/common/antd.vi'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdVi,
    attrs: {
      other_filters: {
        // attrs.other_filters.label
        label: 'Điều kiện khác',
        placeholder: {
          select: {
            // attrs.other_filters.placeholder.select.single
            none: '-- Không chọn --'
          }
        }
      },
        report: {
            label: 'Báo cáo',
            placeholder: {
                select: {
                    none: '-- Tất cả --'
                }
            }
        },
        calls: {
            label: 'Số lần gọi',
            placeholder: {
                select: {
                    none: '-- Tất cả --'
                }
            }
        },
        source_contact: {
            label: 'Nguồn',
            placeholder: {
                select: {
                    none: '-- Tất cả --'
                }
            }
        },
        lead_care: {
            label: 'Quan tâm',
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
      eros_created_at: {
        // attrs.eros_created_at.label
        label: 'Timestamp',
      },
      eros_customer: {
        // attrs.eros_customer.label
        label: 'Học viên',
      },
      eros_course: {
        // attrs.eros_course.label
        label: 'Khóa học',
      },
      eros_staff: {
        // attrs.eros_staff.label
        label: 'Nhân viên',
      },
      eros_level: {
        // attrs.eros_level.label
        label: 'Level',
      },
      eros_actions: {
        // attrs.eros_actions.label
        label: ' ',
        view_on_eros: {
          // attrs.eros_actions.view_on_eros.text
          text: 'Xem trên Eros',
        }
      },
      lead_care_history: {
        attrs: {
          id: {
            // attrs.lead_care_history.attrs.id.label
            label: 'Id',
          },
          created_at: {
            // attrs.lead_care_history.attrs.created_at.label
            label: 'Thời gian',
          },
          lead_care_status_lead_status_name: {
            // attrs.lead_care_history.attrs.call_status_lead_status_name.label
            label: 'Trạng thái đơn',
          },
          lead_care_status_name: {
            // attrs.lead_care_history.attrs.call_status_name.label
            label: 'Trạng thái cuộc gọi',
          },
          lead_care_status_name_2: {
            // attrs.lead_care_history.attrs.call_status_name.label
            label: 'Trạng thái chăm sóc',
          },
          schedule_at: {
            label: 'Ngày hẹn gọi lại',
          },
          result_note: {
            // attrs.lead_care_history.attrs.result_note.label
            label: 'Nội dung chăm sóc',
            errors: {
              // attrs.lead_care_history.attrs.result_note.errors.required
              required: 'Nội dung chăm sóc là trường bắt buộc'
            },
            placeholder: {
              // attrs.lead_care_history.attrs.result_note.placeholder.textarea
              textarea: 'Nhập nội dung chăm sóc..',
            }
          },
          lead_care_status_id: {
            // attrs.lead_care_history.attrs.call_status_id.label
            label: 'Trạng thái cuộc gọi',
            errors: {
              // attrs.lead_care_history.attrs.call_status_id.errors.required
              required: 'Trạng thái cuộc gọi là trường bắt buộc'
            },
            placeholder: {
              select: {
                // attrs.lead_care_history.attrs.call_status_id.placeholder.select.single
                single: 'Chọn trạng thái',
              }
            }
          },
          user_id: {
            // attrs.lead_care_history.attrs.user_id.label
            label: 'Người thực hiện',
          },
          call_log_audio: {
            // attrs.lead_care_history.attrs.call_log_audio.label
            label: 'File ghi âm',
            // attrs.lead_care_history.attrs.call_log_audio.not_found_call_log
            not_found_call_log: 'Không có',
            // attrs.lead_care_history.attrs.call_log_audio.get_audio_link
            get_audio_link: 'Lấy file ghi âm',
            // attrs.lead_care_history.attrs.call_log_audio.browser_not_support
            browser_not_support: 'Trình duyệt của bạn không hỗ trợ xem file ghi âm',
          }
        }
      },
      created_in: {
        // attrs.created_in.label
        label: 'Ngày tạo',
      },
      imported_in: {
        // attrs.imported_in.label
        label: 'Ngày tạo',
      },
        care_date: {
            // attrs.imported_in.label
            label: 'Ngày chăm sóc',
        },
        report_date: {
            // attrs.imported_in.label
            label: 'Ngày lọc',
        },
      assigned_in: {
        // attrs.assigned_in.label
        label: 'Ngày giao tvts',
      },
      status: {
        // attrs.status.label
        label: 'Trạng thái',
      },
      message: {
        // attrs.message.label
        label: 'Message',
      },
      email: {
        // attrs.email.label
        label: 'Email',
        errors: {
        // attrs.email.errors.required
          required: 'Email là trường bắt buộc'
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
      lead_level_id: {
        // attrs.lead_level_id.label
        label: 'Level',
        errors: {
          // attrs.lead_level_id.errors.required
          required: 'Contact level là trường bắt buộc!',
        },
        placeholder: {
          select: {
            // attrs.lead_level_id.placeholder.select.single
            single: 'Chọn level',
            // attrs.lead_level_id..placeholder.select.multiple
            multiple: 'Chọn các contact levels',
            // attrs.lead_level_id.placeholder.select.all
            all: '--  Tất cả --'
          },
        },
      },
      lead_level_name: {
        // attrs.lead_level_name.label
        label: 'Contact level name',
      },
      lead_status_id: {
        // attrs.lead_status_id.label
        label: 'Trạng thái',
        errors: {
          // attrs.lead_status_id.errors.required
          required: 'Trạng thái là trường bắt buộc!'
        },
        placeholder: {
          select: {
            // attrs.lead_status_id.placeholder.select.single
            single: 'Chọn trạng thái',
            // attrs.lead_status_id.placeholder.select.multiple
            multiple: 'Chọn các trạng thái',
            // attrs.lead_status_id.placeholder.select.all
            all: '--  Tất cả --'
          },
        },
      },
      lead_status_code: {
        // attrs.lead_status_code.label
        label: 'Mã trạng thái chăm sóc',
      },
      staff_id: {
        // attrs.staff_id.label
        label: 'Nhân viên',
        placeholder: {
          select: {
            // attrs.staff_id.placeholder.select.single
            single: 'Chọn nhân viên',
            // attrs.staff_id.placeholder.select.multiple
            multiple: 'Chọn các nhân viên',
            // attrs.staff_id.placeholder.select.all
            all: '--  Tất cả --'
          },
        },
      },
      name: {
        // attrs.name.label
        label: 'Tên',
      },
      info: {
        // attrs.info.label
        label: 'Học viên',
        // attrs.info.duplicated
        duplicated: 'Contact trùng',

        // attrs.info.recovery
        recovery: 'Thu hồi',
      },
      campaign: {
        // attrs.campaign.label
        label: 'Camapaign',
      },
      address: {
        // attrs.address.label
        label: 'Địa chỉ',
      },
      birth_day: {
        // attrs.birth_day.label
        label: 'Ngày sinh',
      },
      sex: {
        // attrs.sex.label
        label: 'Giới tính',
      },
      interest: {
        // attrs.interest.label
        label: 'Quan tâm',
      },
      source_url: {
        // attrs.interest.source_url
        label: 'Link sp',
      },
      note: {
        // attrs.note.label
        label: 'Ghi chú',
      },
      source: {
        // attrs.source.label
        label: 'Nguồn',
      },
      count_lead_care_history: {
        // attrs.count_lead_care_history.label
        label: 'Số lần chăm sóc',
      },
      last_lead_care_history: {
        // attrs.last_lead_care_history.label
        label: 'Chăm sóc gần nhất',
      },
      assigned_at: {
        // attrs.assigned_at.label
        label: 'Ngày phân cho tvts',
      },
      imported_at: {
        // attrs.imported_at.label
        label: 'Ngày import',
        errors: {
          // attrs.imported_at.errors.required
          required: 'Ngày import là trường bắt buộc'
        }
      },
      schedule_at: {
        // attrs.schedule_at.label
        label: 'Ngày hẹn gần nhất',
        errors: {
          // attrs.schedule_at.errors.required
          required: ''
        }
      },
      date: {
        // attrs.date.label
        label: 'Ngày'
      },
      actions: {
        // attrs.actions.label
        label: ' ',
      },
      email_lead: {
        attrs: {
          id: {
            // attrs.email_lead.attrs.id.label
            label: 'Id',
          },
          created_at: {
            // attrs..email_lead.attrs.created_at.label
            label: 'Ngày tạo',
          },
          campaign_name: {
            // attrs.email_lead.attrs.campaign_name.label
            label: 'Tên campaign',
          },
          read_at: {
            // attrs.email_lead.attrs.read_at.label
            label: 'Thời gian đọc',
            badge: {
              pending: {
                // nnauh.entities.lead.attrs.email_lead.attrs.read_at.badge.pending.text
                text: 'Đang chờ',
              },
              success: {
                // attrs.email_lead.attrs.read_at.badge.success.text
                text: '{readAt}',
              },
            },
          },
        },
      },
      lead_level: {
        attrs: {
          staff_id: {
            // attrs.lead_level.attrs.staff_id.label
            label: 'Nhân viên',
          },
          lich_hen: {
            // attrs.lead_level.attrs.lich_hen.label
            label: 'Lịch hẹn',
          },
          dinh_muc: {
            // attrs.lead_level.attrs.dinh_muc.label
            label: 'Định mức',
          },
          xu_ly_trong_lich: {
            // attrs.lead_level.attrs.xu_ly_trong_lich.label
            label: 'Đã gọi trong lịch',
          },
          xu_ly_ngoai_lich: {
            // attrs.lead_level.attrs.xu_ly_ngoai_lich.label
            label: 'Đã gọi ngoài lịch',
          },
          chua_goi: {
            // attrs.lead_level.attrs.chua_goi.label
            label: 'Chưa gọi',
          },
          tong_ton: {
            // attrs.lead_level.attrs.chua_goi.label
            label: 'Tồn kho',
          },
          a0: {
            // attrs.lead_level.attrs.a0.label
            label: 'A0',
          },
          a1: {
            // attrs.lead_level.attrs.a1.label
            label: 'A1',
          },
          a2: {
            // attrs.lead_level.attrs.a2.label
            label: 'A2',
          },
          a3: {
            // attrs.lead_level.attrs.a3.label
            label: 'A3',
          },
          a3x: {
            // attrs.lead_level.attrs.a3x.label
            label: 'A3X',
          }
        }
      },
      order: {
        attrs: {
          payment: {
            attrs: {
              payment_detail: {
                attrs: {
                  department_id: {
                    // attrs.order.attrs.payment.attrs.payment_detail.department_id.label
                    label: 'Department id'
                  },
                  account_id: {
                    // attrs.order.attrs.payment.attrs.payment_detail.account_id.label
                    label: 'Số tài khoản'
                  },
                  district: {
                    // attrs.order.attrs.payment.attrs.payment_detail.district.label
                    label: 'Huyện'
                  },
                  user_id: {
                    // attrs.order.attrs.payment.attrs.payment_detail.user_id.label
                    label: 'Mã nhân viên'
                  },
                  bank_code: {
                    // attrs.order.attrs.payment.attrs.payment_detail.bank_code.label
                    label: 'Mã ngân hàng'
                  },
                  province: {
                    // attrs.order.attrs.payment.attrs.payment_detail.province.label
                    label: 'Huyện'
                  },
                  receiver_mobile: {
                    // attrs.order.attrs.payment.attrs.payment_detail.receiver_mobile.label
                    label: 'Sđt người nhận'
                  },
                  note: {
                    // attrs.order.attrs.payment.attrs.payment_detail.note.label
                    label: 'Ghi chú'
                  },
                  booking_date: {
                    // attrs.order.attrs.payment.attrs.payment_detail.booking_date.label
                    label: 'Ngày hẹn'
                  },
                  payment_id: {
                    // attrs.order.attrs.payment.attrs.payment_detail.payment_id.label
                    label: 'Payment id'
                  },
                  address: {
                    // attrs.order.attrs.payment.attrs.payment_detail.address.label
                    label: 'Địa chỉ'
                  },
                  expected_date: {
                    // attrs.order.attrs.payment.attrs.payment_detail.expected_date.label
                    label: 'Thời gian ước lượng'
                  },
                  type: {
                    // attrs.order.attrs.payment.attrs.payment_detail.type.label
                    label: 'Loại payment'
                  },
                  id: {
                    // attrs.order.attrs.payment.attrs.payment_detail.id.label
                    label: 'Id'
                  },
                  receiver_name: {
                    // attrs.order.attrs.payment.attrs.payment_detail.receiver_name.label
                    label: 'Tên người nhận'
                  },
                  office_address_code: {
                    // attrs.order.attrs.payment.attrs.payment_detail.office_address_code.label
                    label: 'Mã văn phòng'
                  },
                  ward: {
                    // attrs.order.attrs.payment.attrs.payment_detail.ward.label
                    label: 'Huyện/Xã'
                  },
                  company_id: {
                    // attrs.order.attrs.payment.attrs.payment_detail.company_id.label
                    label: 'Company id'
                  },
                }
              }
            }
          },
          id: {
            // attrs.order.attrs.id.label
            label: 'Id',
          },
          created_at: {
            // attrs.order.attrs.created_at.label
            label: 'Ngày tạo',
          },
          actions: {
            // attrs.order.attrs.actions.label
            label: ' ',
          },
          lead: {
            // attrs.order.attrs.lead.label
            label: 'Lead',
          },
          user_id: {
            // attrs.order.attrs.user_id.label
            label: 'Nhân viên',
          },
          campaign: {
            // attrs.order.attrs.campaign.label
            label: 'Campaign',
            errors: {
              // attrs.order.attrs.campaign.errors.required
              required: 'Campaign là trường bắt buộc!'
            },
            placeholder: {
              select: {
                // attrs.order.attrs.campaign.placeholder.select.single
                single: 'Chọn campaign'
              }
            }
          },
          package_type: {
            // attrs.package_type.label
            label: 'Hình thức',
            errors: {
              // attrs.package_type.errors.required
              required: 'Hình thức là trường bắt buộc!'
            },
            placeholder: {
              select: {
                // attrs.package_type.placeholder.select.single
                single: 'Chọn Hình thức'
              }
            }
          },
          staff: {
            // attrs.order.attrs.staff.label
            label: 'Nhân viên',
            placeholder: {
              select: {
                // attrs.order.attrs.staff.placeholder.select.all
                all: '-- Tất cả --',
              }
            }
          },
          created_at: {
            // attrs.order.attrs.created_at.label
            label: 'Thời gian tạo'
          },
          actions: {
            // attrs.order.attrs.actions.label
            label: ' '
          },
          created_in: {
            // attrs.order.attrs.created_in.label
            label: 'Thời gian tạo',
          },
          updated_in: {
            // attrs.order.attrs.updated_in.label
            label: 'Thời gian update',
          },
          name: {
            // attrs.order.attrs.name.label
            label: 'Tên',
            errors: {
              // attrs.order.attrs.name.errors.required
              required: 'Tên là trường bắt buộc!'
            }
          },
          email: {
            // attrs.order.attrs.email.label
            label: 'Email',
            errors: {
              // attrs.order.attrs.email.errors.required
              required: 'Email là trường bắt buộc!'
            }
          },
          mobile: {
            // attrs.order.attrs.mobile.label
            label: 'Mobile',
            errors: {
              // attrs.order.attrs.mobile.errors.required
              required: 'Mobile là trường bắt buộc!'
            }
          },
          product: {
            // attrs.order.attrs.product.label
            label: 'Khóa học',
            errors: {
              // attrs.order.attrs.product.errors.required
              required: 'Khóa học là trường bắt buộc!'
            },
            placeholder: {
              select: {
                // attrs.order.attrs.product.placeholder.select.single
                single: 'Chọn khóa học'
              }
            }
          },
          promotion_price: {
            // attrs.order.attrs.promotion_price.label
            label: 'Gía khuyến  mại',
            errors: {
              // attrs.order.attrs.promotion_price.errors.required
              required: 'Gía khuyến  mại là trường bắt buộc!'
            }
          },
          coupon_code: {
            // attrs.order.attrs.coupon_code.label
            label: 'Mã gỉam gía',
          },
          payment_method: {
            // attrs.order.attrs.payment_method.label
            label: 'Phương thức thanh toán',
            errors: {
              // attrs.order.attrs.payment_method.errors.required
              required: 'Phương thức thanh toán là trường bắt buộc!',
            }
          },
          order_level_code: {
            // attrs.order.attrs.order_level_code.label
            label: 'Level'
          },
          cod_adress: {
            // attrs.order.attrs.cod_adress.label
            label: 'Địa chỉ',
            errors: {
              // attrs.order.attrs.cod_adress.errors.required
              required: 'Địa chỉ là trường bắt buộc!'
            }
          },
          cod_province: {
            // attrs.order.attrs.cod_province.label
            label: 'Tỉnh',
            errors: {
              // attrs.order.attrs.cod_province.errors.required
              required: 'Tỉnh là trường bắt buộc!'
            },
            placeholder: {
              select: {
                // attrs.order.attrs.cod_province.placeholder.select.single
                single: 'Chọn tỉnh/thành phố',
              }
            }
          },
          cod_district: {
            // attrs.order.attrs.cod_district.label
            label: 'Huyện',
            errors: {
              // attrs.order.attrs.cod_district.errors.required
              required: 'Huyện là trường bắt buộc!',
              // attrs.order.attrs.cod_district.errors.not_in_province
              not_in_province: 'Huyện đã chọn không nằm trong tỉnh'
            },
            placeholder: {
              select: {
                // attrs.order.attrs.cod_district.placeholder.select.single
                single: 'Chọn quận/huyện',
              }
            }
          },
          cod_ward: {
            // attrs.order.attrs.cod_ward.label
            label: 'Phường/Xã',
            errors: {
              // attrs.order.attrs.cod_ward.errors.required
              required: 'Phường/Xã là trường bắt buộc',
              // attrs.order.attrs.cod_ward.errors.not_in_district
              not_in_district: 'Phường/Xã không nằm trong huyện đã chọn'
            },
            placeholder: {
              select: {
                // attrs.order.attrs.cod_ward.placeholder.select.single
                single: 'Chọn phường/xã',
              }
            }
          },
          cod_expected_date: {
            // attrs.order.attrs.cod_expected_date.label
            label: 'Thời gian mong muốn',
            errors: {
              // attrs.order.attrs.cod_expected_date.errors.required
              required: 'Thời gian mong muốn là trường bắt buộc',
            }
          },
          cod_receiver_name: {
            // attrs.order.attrs.cod_receiver_name.label
            label: 'Tên người nhận',
            errors: {
              // attrs.order.attrs.cod_receiver_name.errors.required
              required: 'Tên người nhận là trường bắt buộc',
            }
          },
          cod_receiver_mobile: {
            // attrs.order.attrs.cod_receiver_mobile.label
            label: 'Số điện thoại người nhận',
            errors: {
              // attrs.order.attrs.cod_receiver_mobile.errors.required
              required: 'Số điện thoại người nhận là trường bắt buộc',
            }
          },
          cod_note: {
            // attrs.order.attrs.cod_note.label
            label: 'Note',
          },
          transfer_bank: {
            // attrs.order.attrs.transfer_bank.label
            label: 'Ngân hàng',
            errors: {
              // attrs.order.attrs.transfer_bank.errors.required
              required: 'Ngân hàng là trường bắt buộc',
            },
            placeholder: {
              // attrs.order.attrs.transfer_bank.placeholder.select.single
              select: {
                single: 'Chọn ngân hàng'
              }
            }
          },
          transfer_account_id: {
            // attrs.order.attrs.transfer_account_id.label
            label: 'Số tài khoản',
            errors: {
              // attrs.order.attrs.transfer_account_id.errors.required
              required: 'Số tài khoản là trường bắt buộc',
            }
          },
          transfer_booking_date: {
            // attrs.order.attrs.transfer_booking_date.label
            label: 'Ngày hẹn',
            errors: {
              // attrs.order.attrs.transfer_booking_date.errors.required
              required: 'Ngày hẹn là trường bắt buộc',
            }
          },
          transfer_receiver_name: {
            // attrs.order.attrs.transfer_receiver_name.label
            label: 'Tên người nhận',
            errors: {
              // attrs.order.attrs.transfer_receiver_name.errors.required
              required: 'Tên người nhận là trường bắt buộc',
            }
          },
          transfer_receiver_mobile: {
            // attrs.order.attrs.transfer_receiver_mobile.label
            label: 'Số điện thoại người nhận',
            errors: {
              // attrs.order.attrs.transfer_receiver_mobile.errors.required
              required: 'Số điện thoại người nhận là trường bắt buộc',
            }
          },
          transfer_note: {
            // attrs.order.attrs.transfer_note.label
            label: 'Note',
          },
          office_office_address: {
            // attrs.order.attrs.office_office_address.label
            label: 'Văn phòng',
            errors: {
              // attrs.order.attrs.office_office_address.errors.required
              required: 'Văn phòng là trường bắt buộc',
            },
            placeholder: {
              // attrs.order.attrs.office_office_address.placeholder.select.single
              select: {
                single: 'Chọn văn phòng'
              }
            }
          },
          office_booking_date: {
            // attrs.order.attrs.office_booking_date.label
            label: 'Ngày hẹn',
            errors: {
              // attrs.order.attrs.office_booking_date.errors.required
              required: 'Ngày hẹn là trường bắt buộc',
            },
          },
          office_receiver_name: {
            // attrs.order.attrs.office_receiver_name.label
            label: 'Tên người nhận',
            errors: {
              // attrs.order.attrs.office_receiver_name.errors.required
              required: 'Tên người nhận là trường bắt buộc',
            },
          },
          office_receiver_mobile: {
            // attrs.order.attrs.office_receiver_mobile.label
            label: 'Số điện thoại người nhận',
            errors: {
              // attrs.order.attrs.office_receiver_mobile.errors.required
              required: 'Số điện thoại người nhận là trường bắt buộc',
            },
          },
          office_note: {
            // attrs.order.attrs.office_note.label
            label: 'Note',
          },
          one_pay_booking_date: {
            // attrs.order.attrs.one_pay_booking_date.label
            label: 'Ngày hẹn',
            errors: {
              // attrs.order.attrs.one_pay_booking_date.errors.required
              required: 'Ngày hẹn là trường bắt buộc',
            }
          },
          one_pay_receiver_name: {
            // attrs.order.attrs.one_pay_receiver_name.label
            label: 'Tên người nhận',
            errors: {
              // attrs.order.attrs.one_pay_receiver_name.errors.required
              required: 'Tên người nhận là trường bắt buộc',
            },
          },
          one_pay_receiver_mobile: {
            // attrs.order.attrs.one_pay_receiver_mobile.label
            label: 'Số điện thoại người nhận',
            errors: {
              // attrs.order.attrs.one_pay_receiver_mobile.errors.required
              required: 'Số điện thoại người nhận là trường bắt buộc',
            },
          },
          one_pay_note: {
            // attrs.order.attrs.one_pay_note.label
            label: 'Note',
          }
        },
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
      title: 'Leads',
      filters_form: {
        form_item: {
          button: {
            export: {
              // index.filters_form.form_item.button.export.text
              text: 'Xuất ({numOfItem})',
            }
          },
        },
      },
      leads_table: {
        expanded_row: {
          tabs: {
            tab: {
              email_leads: {
                // index.leads_table.expanded_row.tabs.tab.email_leads.title
                title: 'Lịch sử gửi mail ({emailLeadCount})',
              },
              orders: {
                // index.leads_table.expanded_row.tabs.tab.orders.title
                title: 'Đơn hàng ({orderCount})',
              },
              lead_care_histories: {
                // index.leads_table.expanded_row.tabs.tab.lead_care_histories.title
                title: 'Lịch sử chăm sóc ({leadCareHistoryCount})',
              },
            },
          },
        },
        tools: {
          search: {
            // index.leads_table.tools.search.placeholder
            placeholder: 'Tìm kiếm theo email, tên, sđt, ghi chú, quan tâm, campaign'
          },
        },
        update_multiple: {
          // index.leads_table.update_multiple.title
          title: 'Cập nhật {selectedLeadKeyCount} leads đã chọn: ',
        },
        import_modal: {
          results_table: {
            // index.leads_table.import_modal.results_table.title
            title: 'Kết quả improt: '
          },
          help: {
            upload_file: {
              // index.leads_table.import_modal.help.upload_file.text
              text: 'Chấp nhận file có định dạng (.csv, .xlsx). ',
              // index.leads_table.import_modal.help.upload_file.sample_file
              sample_file: 'File mẫu',
            }
          }
        },
      },
    },
    new: {
      // new.title
      title: 'Tạo lead',
    },
    edit: {
      // edit.title
      title: 'Cập nhật thông tin lead',
      lead: {
        partial: {
          customer_info: {
            title: 'Thông tin học viên',
            tabs: {
              tab: {
                update_info: {
                  // edit.lead.partial.customer_info.tabs.tab.update_info.title
                  title: 'Thông tin học viên'
                },
                histories: {
                  // edit.lead.partial.customer_info.tabs.tab.histories.title
                  title: 'Lịch sử học viên'
                }
              }
            }
          },
          order_info: {
            // edit.lead.partial.order_info.title
            title: 'Trạng thái contact',
          },
          orders_table: {
            tabs: {
              tab: {
                create_order: {
                  // edit.lead.partial.orders_table.tabs.tab.create_order.title
                  title: 'Tạo đơn hàng',
                },
                orders: {
                  // edit.lead.partial.orders_table.tabs.tab.orders.title
                  title: 'Đơn hàng đã tạo',
                  order_detail: {
                    tabs: {
                      tab: {
                        payment_detail: {
                          // edit.lead.partial.orders_table.tabs.tab.orders.order_detail.tabs.tab.payment_detail.title
                          title: 'Thông tin payment'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          lead_care_histories_table: {
            // edit.lead.partial.lead_care_histories_table.title
            title: 'Lịch sử chăm sóc',
            lead_care_history_update_form: {
              // edit.lead.partial.lead_care_histories_table.lead_care_history_update_form.title
              title: 'Trạng thái & Nội dung chăm sóc'
            },
          },
          lead_recommend: {
            // edit.lead.partial.lead_recommend.title
            title: 'Đề xuất khóa học',
          },
        }
      }
    },
    assign: {
      // assign.assign
      title: 'Phân chia lead',
      leads_form: {
        form_item: {
          numbers: {
            // assign.leads_form.form_item.numbers.label
            label: 'Số lượng',
            placeholder: {
              // assign.leads_form.form_item.numbers.placeholder.input
              input: 'Số lượng leads',
            }
          },
          staff: {
            // assign.leads_form.form_item.staff.label
            label: 'Nhân viên',
            errors: {
              // assign.leads_form.form_item.staff.errors.required
              required: 'Nhân viên là trường bắt buộc!',
            },
            placeholder: {
              select: {
                // assign.leads_form.form_item.staff.placeholder.select.single
                single: 'Chọn nhân viên'
              }
            }
          },
        },
      },
    },
    report: {
      // assign.assign
      title: 'Báo cáo năng suất',
      leads_form: {
        form_item: {
          from: {
            label: 'Từ ngày',
            placeholder: {
              input: 'Chọn ngày',
            }
          },
          to: {
            // assign.leads_form.form_item.staff.label
            label: 'Đến ngày',
            placeholder: {
              input: 'Chọn ngày',
            }
          },
        },
      },
    },
  }),
  antd: antdVi,
  locale: 'en-US',
}
