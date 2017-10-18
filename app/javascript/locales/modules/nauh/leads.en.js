import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    attrs: {
      created_in: {
        // attrs.created_in.label
        label: 'Created in',
      },
      imported_in: {
        // attrs.imported_in.label
        label: 'Imported in',
      },
      assigned_in: {
        // attrs.assigned_in.label
        label: 'Assigned in',
      },
      status: {
        // attrs.status.label
        label: 'Status',
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
      lead_level_id: {
        // attrs.lead_level_id.label
        label: 'Lead level',
        errors: {
          // attrs.lead_level_id.errors.required
          required: 'Lead level is required!',
        },
        placeholder: {
          select: {
            // attrs.lead_level_id.placeholder.select.single
            single: 'Select lead level',
            // attrs.lead_level_id..placeholder.select.multiple
            multiple: 'Select lead levels',
            // attrs.lead_level_id.placeholder.select.all
            all: '--  All --'
          },
        },
      },
      lead_level_name: {
        // attrs.lead_level_name.label
        label: 'Lead level name',
      },
      care_status_id: {
        // attrs.care_status_id.label
        label: 'Care status',
        errors: {
          // attrs.care_status_id.errors.required
          required: 'Care status is required!'
        },
        placeholder: {
          select: {
            // attrs.care_status_id.placeholder.select.single
            single: 'Select care status',
            // attrs.care_status_id.placeholder.select.multiple
            multiple: 'Select statuses',
            // attrs.care_status_id.placeholder.select.all
            all: '--  All --'
          },
        },
      },
      care_status_code: {
        // attrs.care_status_code.label
        label: 'Care status code',
      },
      staff_id: {
        // attrs.staff_id.label
        label: 'Staff',
        placeholder: {
          select: {
            // attrs.staff_id.placeholder.select.single
            single: 'Select staff',
            // attrs.staff_id.placeholder.select.multiple
            multiple: 'Select staffs',
            // attrs.staff_id.placeholder.select.all
            all: '--  All --'
          },
        },
      },
      name: {
        // attrs.name.label
        label: 'Name',
      },
      address: {
        // attrs.address.label
        label: 'Address',
      },
      interest: {
        // attrs.interest.label
        label: 'Interest',
      },
      note: {
        // attrs.note.label
        label: 'Note',
      },
      assigned_at: {
        // attrs.assigned_at.label
        label: 'Assigned at',
      },
      imported_at: {
        // attrs.imported_at.label
        label: 'Imported at',
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
            label: 'Created at',
          },
          campaign_name: {
            // attrs.email_lead.attrs.campaign_name.label
            label: 'Campaign name',
          },
          read_at: {
            // attrs.email_lead.attrs.read_at.label
            label: 'Read at',
            badge: {
              pending: {
                // nnauh.entities.lead.attrs.email_lead.attrs.read_at.badge.pending.text
                text: 'Pending',
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
            label: 'Staff',
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
            label: 'Created at',
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
        title: 'Are you sure delete this lead?',
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
              text: 'Export ({numOfItem})',
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
                title: 'Email logs ({emailLeadCount})',
              },
              orders: {
                // index.leads_table.expanded_row.tabs.tab.orders.title
                title: 'Order ({orderCount})',
              },
            },
          },
        },
        tools: {
          search: {
            // index.leads_table.tools.search.placeholder
            placeholder: 'Search by email, name, mobile, note, interest'
          },
        },
        update_multiple: {
          // index.leads_table.update_multiple.title
          title: 'Update {selectedLeadKeyCount} selected leads: ',
        },
        import_modal: {
          results_table: {
            // index.leads_table.import_modal.results_table.title
            title: 'Import results: '
          },
          help: {
            upload_file: {
              // index.leads_table.import_modal.help.upload_file.text
              text: 'Please upload format correct file (.csv, .xlsx). ',
              // index.leads_table.import_modal.help.upload_file.sample_file
              sample_file: 'Sample file',
            }
          }
        },
      },
    },
    new: {
      // new.title
      title: 'Create new lead',
    },
    edit: {
      // edit.title
      title: 'Update lead',
    },
    assign: {
      // assign.assign
      title: 'Assign',
      leads_form: {
        form_item: {
          numbers: {
            // assign.leads_form.form_item.numbers.label
            label: 'Number',
            placeholder: {
              // assign.leads_form.form_item.numbers.placeholder.input
              input: 'Number of lead',
            }
          },
          staff: {
            // assign.leads_form.form_item.staff.label
            label: 'Staff',
            errors: {
              // assign.leads_form.form_item.staff.errors.required
              required: 'Staff is required!',
            },
            placeholder: {
              select: {
                // assign.leads_form.form_item.staff.placeholder.select.single
                single: 'Select staff..'
              }
            }
          },
        },
      },
    },
  }),
  antd: antdEn,
  locale: 'en-US',
}