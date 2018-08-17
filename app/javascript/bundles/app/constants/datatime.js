import moment from 'moment'

export const LONG_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const SHORT_DATETIME_FORMAT = 'DD/MM/YYYY, HH:mm'
export const REVERSE_SHORT_DATETIME_FORMAT = 'HH:mm DD/MM/YY'
export const MYSQL_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const MYSQL_DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_PICKER_DEFAULT_SHOW_TIME = {
  hideDisabledOptions: true,
  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
}