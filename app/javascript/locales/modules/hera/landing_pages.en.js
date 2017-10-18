import { flattenMessages } from 'helpers/applicationHelper'
import antdEn from 'antd/lib/locale-provider/en_US'
import commontAntdEn from 'locales/common/antd.en'

// HeraLandingPages language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdEn,
    attrs: {
      name: {
        // attrs.name.label
        label: 'Name',
        errors: {
          // attrs.name.errors.required
          required: 'Name is required'
        }
      },
      created_at: {
        // attrs.created_at.label
        label: 'Created at',
      },
      created_in: {
        // attrs.created_in.label
        label: 'Created in',
      },
      updated_in: {
        // attrs.updated_in.label
        label: 'Updated in',
      },
      domain_id: {
        // attrs.domain_id.label
        label: 'Domain',
      },
      discount_id: {
        // attrs.discount_id.label
        label: 'Discount',
        errors: {
          // attrs.discount_id.errors.required
          required: 'Discount is required',
        },
        placeholder: {
          select: {
            // attrs.discount_id.placeholder.select.all
            all: '-- All --',
          }
        }
      },
      strategy: {
        // attrs.strategy.label
        label: 'Strategy',
        errors: {
          // attrs.strategy.errors.required
          required: 'Strategy is required'
        },
      },
      ga_code: {
        // attrs.ga_code.label
        label: 'Ga code',
      },
      thankyou_page_url: {
        // attrs.thankyou_page_url.label
        label: 'Thankyou page url',
      },
      landing_page_type: {
        // attrs.landing_page_type.label
        label: 'Landing page type',
        errors: {
          // attrs.landing_page_type.errors.required
          required: 'Landing page type is required'
        }
      },
      facebook_app_id: {
        // attrs.facebook_app_id.label
        label: 'Facebook app',
      },
      facebook_pixel_code_id: {
        // attrs.facebook_pixel_code_id.label
        label: 'Facebook pixel code',
      },
      user_id: {
        // attrs.user_id.label
        label: 'Creator name',
      },
      landing_page_log: {
        attrs: {
          created_at: {
            // attrs.landing_page_log.attrs.created_at.label
            label: 'Created at',
          },
          user_id: {
            // attrs.landing_page_log.attrs.user_id.label
            label: 'Executed by',
          },
          actions: {
            // attrs.landing_page_log.attrs.actions.label
            label: ' ',
          },
          domain_id_changes: {
            // attrs.landing_page_log.attrs.domain_id_changes.label
            label: 'Domain changes',
          },
          discount_id_changes: {
            // attrs.landing_page_log.attrs.discount_id_changes.label
            label: 'Discount changes',
          },
        }
      }
    },
    popconfirm: {
      delete: {
        // popconfirm.delete.title
        title: 'Are you sure delete this landingPage?',
        // popconfirm.delete.ok_text
        ok_text: 'Yes',
        // popconfirm.delete.cancel_text
        cancel_text: 'No',
      },
    },
    new: {
      // new.title
      title: 'Create new landing page',
    },
    edit: {
      // edit.title
      title: 'Update landing page',
    },
    index: {
      // index.title
      title: 'Landing Pages',
      landing_pages_table: {
        search: {
          // index.landing_pages_table.search.placeholder
          placeholder: 'Search by name..',
        },
        expanded_row: {
          tabs: {
            tab: {
              landing_page_logs: {
                // index.landing_pages_table.expanded_row.tabs.tab.landing_page_logs.title
                title: 'Landing page logs',
              }
            }
          }
        }
      }
    },
    get_codes: {
      // get_codes.title
      title: 'Get codes',
      code_tabs: {
        tab: {
          logic_home: {
            // get_codes.code_tabs.tab.logic_home.title
            title: 'Logic home'
          },
          logic_thankyou: {
            // get_codes.code_tabs.tab.logic_thankyou.title
            title: 'Logic thankyou'
          },
          form: {
            // get_codes.code_tabs.tab.form.title
            title: 'Form'
            
          },
          countdown: {
            // get_codes.code_tabs.tab.countdown.title
            title: 'Countdown'
          },
          facebook_comment: {
            // get_codes.code_tabs.tab.facebook_comment.title
            title: 'Facebook comment'
          },
        }
      }
    }
  }),
  antd: antdEn,
  locale: 'en-US',
}