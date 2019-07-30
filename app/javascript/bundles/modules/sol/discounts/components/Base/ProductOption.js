import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Form, Select } from 'antd';
import debounce from 'lodash/debounce';
import { selectFilterOption } from 'helpers/antdHelper';
import { DEFAULT_FORM_ITEM_LAYOUT } from 'app/constants/form';

const Option = Select.Option
const FormItem = Form.Item

class ProductOption extends React.Component {
  constructor(props) {
    super(props)
    
    this.fetchCombos = debounce(this.props.fetchCombos, 500);
    this.fetchCourses = debounce(this.props.fetchCourses, 500);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state = {}
  }

  handleSearch(keyword){
    if (keyword != '') {
      switch(this.state.dataChange) {
      case "Combo" :
        this.fetchCombos({ 
        fields: 'product_json', 
        compconds: { "code.like": `%${keyword}%`},
        per_page: 10
        })
        break;
      case "Course":
        this.fetchCourses({ 
        fields: 'product_json', 
        compconds: { "code.like": `%${keyword}%` },
        per_page: 10
        })
        break;
      default:
        return null
      }
    }
  }

  handleSelectChange(value) {
    this.props.form.resetFields()
    this.setState({dataChange: value})
  }

  handleChange(value, event){
    event.preventDefault()
  }

  render() {
    const { combos, courses, form, intl } = this.props;
    const state = this.state.dataChange;
    const products = (state === "Course")? courses : combos
    return (
      <FormItem label="Sản phẩm" {...DEFAULT_FORM_ITEM_LAYOUT}>
        {form.getFieldDecorator('product_type', {
          rules: [{ 
            required: true, 
            message: 'Product!' 
          }],
        })(
          <Select
            placeholder="Select option"
            onChange={this.handleSelectChange}
            style={{ width: '20%', marginRight: 5 }}
            allowClear={true}
          >
            <Option value="Course">Course</Option>
            <Option value="Combo">Combo</Option>
          </Select>
        )}

        {state && form.getFieldDecorator('product_id', {
          rules: [{
            required: true,
            message: 'Please select!'
          }],
        })(
          <Select
            showSearch
            allowClear
            filterOption={selectFilterOption}
            style={{ width: '78%', float: 'right', marginTop: 5}}
            onSearch={this.handleSearch}
          >
            {products.map((product) => (
              <Option value={`${product.get('id')}`} key={product.get('id')}>
                {`${product.get('code')} - ${product.get('name')}`}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
}

ProductOption.propTypes = {
  courses: PropTypes.instanceOf(Immutable.List),
  combos: PropTypes.instanceOf(Immutable.List),
  params: PropTypes.object,
  fetchCombos: PropTypes.func,
  fetchCourses: PropTypes.func,
  form: PropTypes.object,
};

ProductOption.contextTypes = {
  company_id: PropTypes.string,
  user_id: PropTypes.string,
};

export default ProductOption;
