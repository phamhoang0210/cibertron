import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    attrs: {
      id: {
        // atts.id.label
        label: 'Id',
      },
      name: {
        // atts.name.label
        label: 'Name',
        errors: {
          // attrs.name.errors.required
          required: 'Name is required'
        }
      },
      level: {
        // atts.level.label
        label: 'Level',
      },
      role_assignment: {
        // attrs.role_assignment.label
        label: 'Role assignment'
      },
      entity: {
        // attrs.entity.label
        label: 'Entity',
        placeholder: {
          select: {
            // attrs.entity.placeholder.select.single
            single: 'Select entity',
          }
        }
      },
      access_level: {
        placeholder: {
          select: {
            // attrs.access_level.placeholder.select.single
            single: 'Select access level',
          }
        }
      },
      actions: {
        // atts.actions.label
        label: ' ',
      },
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this role?',
        // popconfirm.delete.ok_text
        ok_text: 'Yes',
        // popconfirm.delete.cancel_text
        cancel_text: 'No'
      }
    },
    new: {
      // new.title
      title: 'Create new role'
    },
    index: {
      // index.title
      title: 'Roles',
      roles_table: {
        tools: {
          search: {
            // index.roles_table.tools.search.placeholder
            placeholder: 'Search by name..'
          }
        }
      }
    },
    edit: {
      // edit.title
      title: 'Update role',
      tabs: {
        tab: {
          role_basic: {
            title: 'Role',
          },
          role_assignment: {
            title: 'Role assignment',
          }
        }
      }
    },
    shared: {
      role_assignment_editor: {
        module_nodes: {
          add_new_permission: {
            // shared.role_assignment_editor.module_nodes.add_new_permission
            text: 'Add new permission'
          }
        }
      }
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}