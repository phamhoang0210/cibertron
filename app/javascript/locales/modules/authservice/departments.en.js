import { flattenMessages } from 'helpers/applicationHelper'
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
      name: {
        // attrs.name.label
        label: 'Name',
        errors: {
          // attrs.name.errors.required
          required: 'Name is required',
        },
      },
      priority: {
        // attrs.name.label
        label: 'Priority',
        errors: {
          // attrs.priority.errors.required
          required: 'Priority is required',
        },
      },
      description: {
        // attrs.description.label
        label: 'Description',
      },
      company: {
        // attrs.company.label
        label: 'Company',
        placeholder: {
          select: {
            // attrs.company.placeholder.select.single
            single: 'Select company',
          }
        }
      },
      company_name: {
        // attrs.company_name.label
        label: 'Company',
      },
      sup_department: {
        // attrs.sup_department.label
        label: 'Department',
        placeholder: {
          select: {
            // attrs.department.placeholder.select.single
            single: 'Select super department',
          }
        }
      },
      sup_department_name: {
        // attrs.sup_department_name.label
        label: 'Super department'
      },
      actions: {
        // attrs.actions.label
        label: ' '
      }
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this department?',
        // popconfirm.delete.ok_text
        ok_text: 'Yes',
        // popconfirm.delete.cancel_text
        cancel_text: 'No'
      }
    },
    new: {
      // new.title
      title: 'Create new department'
    },
    index: {
      // index.title
      title: 'Department',
      dpeartments_table: {
        tools: {
          search: {
            // index.dpeartments_table.tools.search.placeholder
            placeholder: 'Search by name..'
          }
        }
      },
    },
    edit: {
      // edit.title
      title: 'Update department'
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}