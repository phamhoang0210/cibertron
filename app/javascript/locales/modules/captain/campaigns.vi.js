import { flattenMessages } from 'helpers/applicationHelper'
import antdVi from 'antd/lib/locale-provider/vi_VN'
import commontAntdVi from 'locales/common/antd.vi'

// NauhLeads language file used for internationalization
export const appLocale = {
  messages: flattenMessages({
    ...commontAntdVi,
    index: {
      campaigns: {
        // index.campaigns.label
        label: 'Tên chiến dịch',
         // index.campaigns.placeholder.select.none
        placeholder: {
          select: {
              none: '-- Tất cả --'
          }
        }
      },
      create_date: {
        label: 'Ngày tạo',
        placeholder: {
          select: {
              none: '-- Chọn ngày tạo --'
          }
        }
      },
      user: {
        label: 'Người tạo',
        placeholder: {
          select: {
              none: '-- Tất cả --'
          }
        }
      },
      type: {
        label: 'Type',
        placeholder: {
          select: {
              none: '-- Type --'
          }
        }
      },
      time_start: {
        label: 'Thời gian bắt đầu',
        placeholder: {
          select: {
              none: '-- Thời gian bắt đầu --'
          }
        }
      },
      time_over: {
        label: 'Thời gian kết thúc',
        placeholder: {
          select: {
              none: '-- Thời gian kết thúc --'
          }
        }
      },
      status: {
        label: 'Status',
        placeholder: {
          select: {
              none: '-- Status --'
          }
        }
      },
    }
  }),
  antd: antdVi,
  locale: 'en-US',
}
