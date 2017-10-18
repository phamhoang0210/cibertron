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
      imported_in: {
        // attrs.imported_in.label
        label: 'Ngày import',
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
        label: 'Contact level',
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
      care_status_id: {
        // attrs.care_status_id.label
        label: 'Trạng thái',
        errors: {
          // attrs.care_status_id.errors.required
          required: 'Trạng thái là trường bắt buộc!'
        },
        placeholder: {
          select: {
            // attrs.care_status_id.placeholder.select.single
            single: 'Chọn trạng thái',
            // attrs.care_status_id.placeholder.select.multiple
            multiple: 'Chọn các trạng thái',
            // attrs.care_status_id.placeholder.select.all
            all: '--  Tất cả --'
          },
        },
      },
      care_status_code: {
        // attrs.care_status_code.label
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
      address: {
        // attrs.address.label
        label: 'Địa chỉ',
      },
      interest: {
        // attrs.interest.label
        label: 'Quan tâm',
      },
      note: {
        // attrs.note.label
        label: 'Ghi chú',
      },
      assigned_at: {
        // attrs.assigned_at.label
        label: 'Ngày phân cho tvts',
      },
      imported_at: {
        // attrs.imported_at.label
        label: 'Ngày import',
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
          a3: {
            // attrs.lead_level.attrs.a3.label
            label: 'A3X',
          }
        }
      },
      order: {
        attrs: {
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
            },
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
            },
          },
        },
        tools: {
          search: {
            // index.leads_table.tools.search.placeholder
            placeholder: 'Tìm kiếm theo email, tên, sđt, ghi chú, quan tâm'
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
  }),
  antd: antdVi,
  locale: 'en-US',
}