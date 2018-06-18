import React from 'react'
import _ from 'lodash'

import {
  Form, Input, Row, Col, Button, Select, Alert, Checkbox, Spin, Cascader,
  InputNumber, Radio, DatePicker, Icon
} from 'antd'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import { selectFilterOption } from 'helpers/antdHelper'
import { MD5 } from 'helpers/md5Helper'


const FormItem = Form.Item
const DEFAULT_FORM_ITEM_LAYOUT = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
}

import 'styles/modules/nauh/leads'

class RecommendBox extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, [
      'handleSubmit',
    ])
    var key1 = new Date().getTime()
    var key2 = key1 + 5
    var key3 = key1 + 10
    this.state = {
      selectCourses: [],
      selectCoursesId: [],
      configs:[{key:key1, quantity:1,price:0}, {key:key2, quantity:1,price:0}, {key:key3, quantity:1,price:0}]
    }

    this.onCheckCheckbox = this.onCheckCheckbox.bind(this)
    this.handleSelectOnSelect = this.handleSelectOnSelect.bind(this)
    this.handleSelectOnDeSelect = this.handleSelectOnDeSelect.bind(this)
    this.handleFilterOption = this.handleFilterOption.bind(this)
    this.onCickPlusConfig = this.onCickPlusConfig.bind(this)
    this.onCickMinusConfig = this.onCickMinusConfig.bind(this)
    this.onChangeQuantity = this.onChangeQuantity.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
  }

  componentDidMount() {
    const {actions, editState} = this.props
    const lead = editState.get('lead')
    const email = lead.get('email')
    const lead_id = lead.get('id')
    this.props.actions.fetchRecommendation(email, 10)
    this.props.actions.fetchRecommendationNauh(lead_id)
    actions.fetchCampaigns({per_page: 'infinite'})
    actions.fetchPrices({per_page: 'infinite'})
      //actions.fetchUser(lead.staff_id, {fields: 'basic_profile{}'})
  }

  // Xử lý sự kiện khi check vào checkbox
  onCheckCheckbox(e, course) {
    let courses = this.state.selectCourses
    let value = {};
    value.id = course.get('_id')
    value.price = course.get('price')
    value.name = course.get('name')
    value.alias_name = course.get('alias_name')
    value.code = course.get('code')

    let ids = this.state.selectCoursesId

    if (e.target.checked == true) {
      if(courses.indexOf(value) <= 0){
          courses.push(value)
      }
      if(ids.indexOf(value.id) <= 0){
          ids.push(value.id)
      }

    } else {
      this.removeCources(courses, value);
      this.removeCources(ids, value.id);
    }

    this.setState({selectCourses: courses})
    this.setState({selectCoursesId: ids})
  }


  // Xóa khóa học trong danh sách
  removeCources(sources, value) {

    var index = sources.indexOf(value)
    if (index >= 0) {
        sources.splice(index, 1);
    }

  }

  handleChange(values) {

    // this.setState({selectCourses: courses.push(value)})
  }

  // Xử lý sự kiện lúc select khóa học
  handleSelectOnSelect(value, opt){

    const temp = opt.props.recommend;
    let course = {} ;
    course.id = temp.get('source_id')
    course.price = temp.get('price')
    course.name = temp.get('name')
    course.alias_name = temp.get('alias_name')
    course.code = temp.get('code');

    let courses = this.state.selectCourses;
    let ids = this.state.selectCoursesId
    courses.push(course)
    ids.push(value)

    this.setState({selectCourses: courses})
    this.setState({selectCoursesId: ids})

    //Checkbox tương ứng = true
    if (this.refs && this.refs[value]) {
      this.refs[course.id].rcCheckbox.state.checked=true
    }
  }

  // Xử lý bỏ khóa học ở select
  handleSelectOnDeSelect(value, opt){

    let courses = this.state.selectCourses;
    courses.map(
      function(course){
        if (course.id == value) {
          var index = courses.indexOf(course)
          if (index >= 0) {
              courses.splice(index, 1);
          }
        }
      }
    )

    let ids = this.state.selectCoursesId


    this.removeCources(ids, value);

    this.setState({selectCourses: courses})
    this.setState({selectCoursesId: ids})

    // Checkbox tương ứng = false
    if (this.refs && this.refs[value]) {
        this.refs[value].rcCheckbox.state.checked=false
    }

  }

  // Override lại hàm search của select
  handleFilterOption(input, child) {

    if (child.props.disabled) {
      return false;
    }
    var value = String(child.props.recommend.get('name'));
    return value.toLowerCase().indexOf(input.toLowerCase()) > -1;
  }

  // Xử lý submit
  handleSubmit(e) {

    e.preventDefault()
    const {actions} = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = this.formatFormData(values)
        actions.createRecommendation(params)
      }
    })
  }

  formatFormData(values) {
    const {actions, editState} = this.props
    const lead = editState.get('lead')

    let params = values
    params.lead_id = lead.get('id');
    // params.lead_email = lead.get('email');
    params.product_ids = this.state.selectCourses;
    params.config = this.state.configs
    params.campaign_code = values.record.campaign_code
    params.coupon_code = values.record.coupon_code
    return params
  }

  onCickPlusConfig(){

    const key = new Date().getTime()
    let config = {key: key, quantity: 0, price: 0}
    let configs = this.state.configs;
    configs.push(config)

    this.setState({configs: configs})
  }

  onCickMinusConfig(key){

    let configs = this.state.configs;
    this.removeCources(configs, key);

    this.setState({configs: configs})
  }

  onChangeQuantity(input, key) {
    let configs = this.state.configs;
    var value = input.currentTarget.value

    let newConfigs = configs.map(el => (
        el.key===key? {...el, quantity: value}: el
      ))

    this.setState({configs: newConfigs})
  }

  onChangePrice(input, key) {
    let configs = this.state.configs;
    var value = input.currentTarget.value

    let newConfigs = configs.map(el => (
        el.key===key? {...el, price: value}: el
      ))

    this.setState({configs: newConfigs})
  }

  render() {
    const {editState, sharedState, intl} = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const campaigns = sharedState.get('campaigns')
    const isRec = editState.get('isRec')

    const Option = Select.Option

    let allCourses = sharedState.get("courses")
    let recCourses = editState.get('recCourses')
    //recCourses.mergeDeep(allCourses);


    const recommendNauh = editState.get('recommendNauh')
    let defaultCampaign = "";
    let recommendId = null;
    let defaultCupon = "";
    let coursesRecommend = []

    if (recommendNauh) {
      var temp = recommendNauh.get("product_ids")
      var tempConfig = recommendNauh.get("config")
      defaultCampaign = recommendNauh.get("campaign_code")
      recommendId = recommendNauh.get("id")
      defaultCupon = recommendNauh.get("coupon_code")

      if (temp) {
        coursesRecommend = JSON.parse(temp)
      }
      if (tempConfig && this.state.configs.length == 1) {
        this.state.configs = JSON.parse(tempConfig)

      }

    }
    if (this.state.selectCoursesId.length == 0 && coursesRecommend.length > 0) {
        this.state.selectCoursesId = coursesRecommend.map(function(item){ return item.id })
        this.state.selectCourses = coursesRecommend.map(function(item){ return item})
    }
    //let courseIds = coursesRecommend.map(function(item){ return item.id }) + this.state.selectCoursesId
    const configLength = this.state.configs.length


    if (isRec) {
      return (
        <p>Loading...</p>
      )
    }


    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">
            {intl.formatMessage({id: 'edit.lead.partial.lead_recommend.title'})}
          </h3>
        </div>
        <div className="box-body">
          <Row gutter={16}>
            <Form onSubmit={this.handleSubmit} >
              <Row>
                <Col span={12}>
                  {editState.get('recCourses').map(course =>
                        <Row key={course.get('_id')}>
                            <Checkbox onChange={(e) => this.onCheckCheckbox(e, course)} ref={course.get('_id')} checked={(this.state.selectCoursesId && this.state.selectCoursesId.indexOf(course.get('_id')) >= 0) ? true : false}>{course.get('name')}</Checkbox>
                        </Row>
                  )}
                  <Row>

                    <FormItem
                      label={intl.formatMessage({id: 'attrs.order.attrs.campaign.label'})}
                      {...DEFAULT_FORM_ITEM_LAYOUT}
                    >
                      {getFieldDecorator('record.campaign_code', {
                        rules: [
                          { required: false, message: intl.formatMessage({id: 'attrs.order.attrs.campaign.errors.required'}) }
                        ],
                        initialValue: defaultCampaign
                      })(
                        <Select
                          showSearch
                          filterOption={selectFilterOption}
                          placeholder={intl.formatMessage({id: 'attrs.order.attrs.campaign.placeholder.select.single'})}
                        >
                          {campaigns.map(campaign => (
                            <Option value={`${campaign.get('code')}`} key={campaign.get('id')}>
                              {campaign.get('code')}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </Row>

                </Col>
                <Col span={12}>
                  <Row>
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Chọn khóa học"
                        value={this.state.selectCoursesId}
                        onChange={this.handleChange.bind(this)}
                        onSelect={this.handleSelectOnSelect}
                        onDeselect={this.handleSelectOnDeSelect}
                        filterOption={this.handleFilterOption}
                      >
                        {allCourses.map(course =>

                          <Option key={course.get('source_id')} recommend={course} ref={course.get('source_id')}>{course.get('name')}</Option>
                        )}
                      </Select>
                  </Row>
                  {
                    this.state.configs.map((config, index) =>
                      <Row key={config.key}>
                        <Col span={10}>
                          <FormItem
                              label='Số khóa'
                              {...DEFAULT_FORM_ITEM_LAYOUT}
                            >
                                <Input className='quantity' type="number" key={config.key} defaultValue={config.quantity} onChange={(e) => this.onChangeQuantity(e, config.key)}/>

                          </FormItem>
                        </Col>
                        <Col span={10}>
                          <FormItem
                              label='Giá'
                              {...DEFAULT_FORM_ITEM_LAYOUT}
                            >
                                <Input className='price' type="number" key={config.key} onChange={(e) => this.onChangePrice(e, config.key)} defaultValue={config.price}/>

                          </FormItem>
                        </Col>
                        <Col span={2} style={{ margin: '10px auto' }} hidden="true" >
                          {(configLength === index + 1) ? (
                              <Icon key={config.key} type="plus" onClick={this.onCickPlusConfig}/>
                            ) : (
                              <Icon key={config.key} type="minus" onClick={(e) => this.onCickMinusConfig(config)}/>
                            )
                          }
                        </Col>
                      </Row>
                    )
                  }

                </Col>
              </Row>
                <Row>
                    <Col span={12} className="text-align--left" id="prices-box">
                        <div dangerouslySetInnerHTML={{ __html: this.renderPrices() }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                    </Col>
                    <Col span={8} className="text-align--left" id="prices-box">
                        <b>LINK:</b> <a href={recommendId ? "http://baogia.edumall.vn/?id=" + recommendId + '@' + MD5(recommendId.toString()) : "#"} target="_blank">Trang báo giá</a>
                    </Col>
                </Row>
              <Row>
                <Col span={16}>
                </Col>
                <Col span={8} className="text-align--right">
                  <Button
                    type="primary"
                    htmlType="submit"

                  >
                    Gửi Emaill

                  </Button>
                </Col>
              </Row>
            </Form>
            </Row>
        </div>
      </div>
    );
  }
    renderPrices() {
        const {newState, sharedState, form, intl} = this.props
        const { getFieldDecorator, getFieldValue } = form
        let prices = sharedState.get('prices')
        var listSelectCourses = this.state.selectCourses
        var listPrice = []
        listSelectCourses.map(function (course) {
            prices.map(function (price) {
              var priceid = price.get('course_id')
              if(course.id == priceid) {
                var min = price.get('min_price')
                var name = course.name
                  listPrice.push([min, name])
              }
            })
        })
        var arrayLength = listPrice.length;
        var html = '<b>CÁC KHÓA HỌC BỊ GIỚI HẠN GIÁ ĐÃ CHỌN:</b><br>'
        for (var i = 0; i < arrayLength; i++) {
            html += listPrice[i][1] + ': <b>' + listPrice[i][0] + '</b><br>';
        }
        return (html)
    }
}

export default Form.create()(injectIntl(RecommendBox))
