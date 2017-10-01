import React from 'react'
import _ from 'lodash'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { selectFilterOption } from 'helpers/antdHelper'

const Option = Select.Option

class SelectEditable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editMode: false,
    }

    _.bindAll(this, [
      'onClick',
      'onBlur',
    ])
  }

  onClick(e) {
    this.setState({editMode: true})
  }

  onBlur(e) {
    this.setState({editMode: false})
  }

  render() {
    const {disabledContent, options, ...props} = this.props
    const { editMode } = this.state
    let content = null
    if(editMode) {
      content = (
        <Select
          showSearch
          filterOption={selectFilterOption}
          onBlur={this.onBlur}
          style={{width: '100%'}}
          {...props}
        >
          {options.map(option => (
            <Option key={option.get('id')} value={`${option.get('id')}`}>
              {option.get('title')}
            </Option>
          ))}
        </Select>
      )
    } else {
      content = disabledContent
    }

    return (
      <div
        onClick={this.onClick}
      >
        {content}
      </div>
    )
  }
}

SelectEditable.defaultProps = {
  options: [],
}

SelectEditable.propTypes = {
  options: PropTypes.instanceOf(List),
}

export default SelectEditable