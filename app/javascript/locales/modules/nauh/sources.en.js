import { flattenMessages } from 'helpers/applicationHelper'
import antdVi from 'antd/lib/locale-provider/vi_VN'
import commontAntdVi from 'locales/common/antd.vi'

// NauhLeads language file used for internationalization

export const appLocale = {
  messages: flattenMessages({
    ...commontAntdVi,
      
    index: {
      // index.title
      title: 'Sources',
      sources_table: {
        actions: {
          clear: {
            // index.sources_table.actions.button.clear
            button: 'Clear',
          },
          hand_over: {
            // index.sources_table.actions.button.hand_over
            button: 'Hand over',
          },
          send_email: {
            // index.sources_table.actions.button.send_email
            button: 'Send Email',
          },
          move_to_test: {
            // index.sources_table.actions.button.move_to_test
            button: 'Move to test',
          },
          move_to_trash: {
            // index.sources_table.actions.button.move_to_trash
            button: 'Move to trash',
          },
          move_to_new: {
            // index.sources_table.actions.button.move_to_new
            button: 'Move to new',
          },
        },
        tools: {
          search: {
            // index.sources_table.tools.search.placeholder
            placeholder: 'Tìm theo email, url..'
          }
        },
        headers: {
          email: {
            // index.sources_table.headers.email.title
            title: "Email"
          },
          created_at: {
            // index.sources_table.headers.created_at.title
            title: "Date"
          },
          status: {
            // index.sources_table.headers.status.title
            title: "Status"
          },
          l8_count: {
            // index.sources_table.headers.l8_count.title
            title: "L8"
          },
          interest: {
            // index.sources_table.headers.interest.title
            title: "Interest"
          },
          source_url: {
            // index.sources_table.headers.source_url.title
            title: "Source URL"
          }
        },
        others: {
          selected: {
            // index.sources_table.others.selected_label
            label: 'Selected'
          }
        },
      },
      filters_form: {
        form_item: {
          title: {
            created: {
              // index.filters_form.form_item.title.created.text
              text: "Created",
            },
            status: {
              // index.filters_form.form_item.title.status.text
              text: "Status",
            }
          }
        }
      }
    },
  }),
  antd: antdVi,
  locale: 'en-US',
}