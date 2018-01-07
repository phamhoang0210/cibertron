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
      assigned_in: {
        // attrs.assigned_in.label
        label: 'Ngày giao tvts',
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
      content: {
        // attrs.content.label
        label: 'Content',
        errors: {
          // attrs.content.errors.required
          required: 'Content là trường bắt buộc!'
        }
      },

      name: {
        // attrs.name.label
        label: 'Tên template',
        errors: {
        // attrs.name.errors.required
          required: 'Tên là trường bắt buộc'
        }
      },
      imported_at: {
        // attrs.imported_at.label
        label: 'Ngày import',
        errors: {
          // attrs.imported_at.errors.required
          required: 'Ngày import là trường bắt buộc'
        }
      },
      actions: {
        // attrs.actions.label
        label: ' ',
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
      title: 'Templates',
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
        expanded_row: {
          tabs: {
            tab: {
              email_campaigns: {
                // index.campaigns_table.expanded_row.tabs.tab.email_campaigns.title
                title: 'Lịch sử gửi mail ({emailLeadCount})',
              },
              orders: {
                // index.campaigns_table.expanded_row.tabs.tab.orders.title
                title: 'Đơn hàng ({orderCount})',
              },
              campaign_care_histories: {
                // index.campaigns_table.expanded_row.tabs.tab.campaign_care_histories.title
                title: 'Lịch sử chăm sóc ({campaignCareHistoryCount})',
              },
            },
          },
        },
        tools: {
          search: {
            // index.campaigns_table.tools.search.placeholder
            placeholder: 'Tìm kiếm theo tên Campaign'
          },
        },
        update_multiple: {
          // index.campaigns_table.update_multiple.title
          title: 'Cập nhật {selectedLeadKeyCount} campaigns đã chọn: ',
        },
        import_modal: {
          results_table: {
            // index.campaigns_table.import_modal.results_table.title
            title: 'Kết quả improt: '
          },
          help: {
            upload_file: {
              // index.campaigns_table.import_modal.help.upload_file.text
              text: 'Chấp nhận file có định dạng (.csv, .xlsx). ',
              // index.campaigns_table.import_modal.help.upload_file.sample_file
              sample_file: 'File mẫu',
            }
          }
        },
      },
    },
    new: {
      // new.title
      title: 'Tạo campaign',
    },
    edit: {
      // edit.title
      title: 'Cập nhật thông tin campaign',
      campaign: {
        partial: {
          customer_info: {
            title: 'Thông tin học viên',
            tabs: {
              tab: {
                update_info: {
                  // edit.campaign.partial.customer_info.tabs.tab.update_info.title
                  title: 'Thông tin học viên'
                },
                histories: {
                  // edit.campaign.partial.customer_info.tabs.tab.histories.title
                  title: 'Lịch sử học viên'
                }
              }
            }
          },
          
        }
      }
    },

  }),
  antd: antdVi,
  locale: 'en-US',
}