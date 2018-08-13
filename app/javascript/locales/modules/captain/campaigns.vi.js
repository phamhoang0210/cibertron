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
    },
    new: {
      campaign:{
        label: 'TÊN CHIẾN DỊCH',
        placeholder: {
          select: {
              none: '-- Nhập tên chiến dịch --'
          }
        },
        required: '"TÊN CHIẾN DỊCH" là trường bắt buộc'
      },
      time_start:{
        label: 'Thời gian bắt đầu',
        placeholder: {
          select: {
              none: '-- Thời gian bắt đầu --'
          }
        },
        required: '"Thời gian bắt đầu" là trường bắt buộc'
      },
      time_end:{
        label: 'Thời gian kết thúc',
        placeholder: {
          select: {
              none: '-- Thời gian kết thúc --'
          }
        },
        required: '"Thời gian kết thúc" là trường bắt buộc'
      },
      status: {
        label: 'Status',
        required: '"Status" là trường bắt buộc'
      },
      show:{
        label: 'Hiển thị',
        required: '"Hiển thị" là trường bắt buộc'
      },
      link_tracking: {
        label: 'Link Tracking',
        placeholder: {
          select: {
            none: '-- Nhập link tracking --'
          }
        },
        required: '"Link Tracking" là trường bắt buộc'
      }
    }
  }),
  antd: antdVi,
  locale: 'en-US',
}
