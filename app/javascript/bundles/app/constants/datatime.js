import moment from 'moment'

export const LONG_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const SHORT_DATETIME_FORMAT = 'DD/MM/YY, \nHH:mm'
export const MYSQL_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const TIME_PICKER_DEFAULT_SHOW_TIME = {
  hideDisabledOptions: true,
  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
}