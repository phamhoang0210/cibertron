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
      code: {
        // attrs.code.label
        label: 'Code',
        errors: {
          // attrs.code.errors.required
          required: 'Code is required'
        }
      },
      channel_id: {
        // attrs.channel_id.label
        label: 'Channel',
        errors: {
          // attrs.channel_id.errors.required
          required: 'Channel is required',
        },
        placeholder: {
          select: {
            // attrs.channel_id.placeholder.select.single
            single: 'Select channel',
          }
        }
      },
      channel_code: {
        // attrs.channel_code.label
        label: 'Channel code'
      },
      actions: {
        // attrs.actions.label
        label: ' '
      },
      worker: {
        // attrs.worker.label
        label: 'Worker',
        placeholder: {
          select: {
            // attrs.worker.placeholder.select.select
            select: 'Select worker',
          }
        },
        cascader: {
          user: {
            // attrs.worker.cascader.user.label
            label: 'User',
          },
          department: {
            // attrs.worker.cascader.department.label
            label: 'Department',
          }
        }
      },
      product: {
        // attrs.product.label
        label: 'Product',
        placeholder: {
          select: {
            // attrs.product.placeholder.select.single
            single: 'Select product',
          }
        },
        cascader: {
          course: {
            // attrs.product.cascader.course.label
            label: 'Course',
          },
          combo: {
            // attrs.product.cascader.combo.label
            label: 'Combo',
          },
          target: {
            // attrs.product.cascader.target.label
            label: 'List',
          }
        }
      },
      auto_generate_code: {
        checkbox: {
          // attrs.auto_generate_code.checkbox.text
          text: 'Auto generate code'
        }
      }
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this node?',
        // popconfirm.delete.ok_text
        ok_text: 'Ok',
        // popconfirm.delete.cancel_text
        cancel_text: 'No',
      }
    },
    new: {
      // new.title
      title: 'Create new node',
    },
    index: {
      // index.title
      title: 'Nodes',
      nodes_table: {
        tools: {
          search: {
            // index.nodes_table.tools.search.placeholder
            placeholder: 'Search by code..',
          }
        }
      }
    },
    edit: {
      // edit.title
      title: 'Update node',
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}