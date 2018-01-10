import React from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { LONG_DATETIME_FORMAT, MYSQL_DATETIME_FORMAT, TIME_PICKER_DEFAULT_SHOW_TIME } from 'app/constants/datatime'
import { FILTER_FORM_ITEM_LAYOUT } from 'app/constants/form'
import { IZZY_BASE_URL } from '../../../../constants/paths'
import {
  getFilterParams, getFilterParamsAndSyncUrl, mergeDeep, getInitialValueForRangePicker,
  getInitialValue,
} from 'helpers/applicationHelper'
import moment from 'moment'
import qs from 'qs'
import {getCredentials} from 'helpers/auth/authHelper'
import { selectFilterOption } from 'helpers/antdHelper'
import { injectIntl } from 'react-intl'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class TemplateFiltersFormBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
    ])

  }

  render() {

    return (
      <div className="box box-with-shadow box-with-border">
       
      </div>
    )
  }
}

export default Form.create()(injectIntl(TemplateFiltersFormBox))