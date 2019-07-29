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

class EditProductOption extends React.Component {
  constructor(props) {
    super(props)
    
    this.fetchCombos = debounce(this.props.fetchCombos, 500);
    this.fetchCourses = debounce(this.props.fetchCourses, 500);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state = {}
  }


  componentDidMount() {
    const {discount} = this.props
    let getState = discount.get('product_type')
    if(getState === 'Combo'){
    this.setState({dataChange: getState})
    }else{
      this.setState({dataChange: getState})
    }
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
    this.setState({dataChange: value})
  }

  render() {
    const { combos, courses, form, discount } = this.props;  
    const state = this.state.dataChange;
    const products = (state === "Course")? courses : combos;
    return (
      <FormItem label="Sản phẩm" {...DEFAULT_FORM_ITEM_LAYOUT}>
        {form.getFieldDecorator('product_type', {
          rules: [{ 
            required: true, 
            message: 'Product!' 
          }],
          initialValue: `${discount.get('product_type')}`,
        })(
          <Select
            placeholder="Select option"
            onChange={this.handleSelectChange}
            style={{ width: '20%', marginRight: 8 }}
            allowClear={true}
          >
            <Option value="Course">Course</Option>
            <Option value="Combo">Combo</Option>
          </Select>
        )}

        {form.getFieldDecorator('product_id', {
          rules: [{
            required: true,
            message: 'Please select!'
          }],
          initialValue: `${discount.get('product_id')}`,
        })(
          <Select
            showSearch
            allowClear
            filterOption={selectFilterOption}
            style={{ width: '78%', marginRight: 0 }}
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

EditProductOption.propTypes = {
  courses: PropTypes.instanceOf(Immutable.List),
  combos: PropTypes.instanceOf(Immutable.List),
  params: PropTypes.object,
  fetchCombos: PropTypes.func,
  fetchCourses: PropTypes.func,
  form: PropTypes.object,
};

EditProductOption.contextTypes = {
  company_id: PropTypes.string,
  user_id: PropTypes.string,
};

export default EditProductOption;
