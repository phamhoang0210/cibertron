import React from 'react'
import _ from 'lodash'

import {
  Form, Input, Row, Col, Button, Select, Alert, Checkbox, Spin, Cascader,
  InputNumber, Radio, DatePicker, Icon
} from 'antd'
import moment from 'moment'
import { injectIntl } from 'react-intl'
import { selectFilterOption } from 'helpers/antdHelper'


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
    const key = new Date().getTime()
    this.state = {
      selectCourses: [],
      selectCoursesId: [],
      configs:[{key:key, quantity:1,price:0}]
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
      var MD5=function(r){function n(r,n){return r<<n|r>>>32-n}function t(r,n){var t,o,e,a,u;return e=2147483648&r,a=2147483648&n,u=(1073741823&r)+(1073741823&n),(t=1073741824&r)&(o=1073741824&n)?2147483648^u^e^a:t|o?1073741824&u?3221225472^u^e^a:1073741824^u^e^a:u^e^a}function o(r,o,e,a,u,f,i){var C;return t(n(r=t(r,t(t((C=o)&e|~C&a,u),i)),f),o)}function e(r,o,e,a,u,f,i){var C;return t(n(r=t(r,t(t(o&(C=a)|e&~C,u),i)),f),o)}function a(r,o,e,a,u,f,i){return t(n(r=t(r,t(t(o^e^a,u),i)),f),o)}function u(r,o,e,a,u,f,i){return t(n(r=t(r,t(t(e^(o|~a),u),i)),f),o)}function f(r){var n,t="",o="";for(n=0;n<=3;n++)t+=(o="0"+(r>>>8*n&255).toString(16)).substr(o.length-2,2);return t}var i,C,c,g,h,v,d,S,m,l=Array();for(l=function(r){for(var n,t=r.length,o=t+8,e=16*((o-o%64)/64+1),a=Array(e-1),u=0,f=0;f<t;)u=f%4*8,a[n=(f-f%4)/4]=a[n]|r.charCodeAt(f)<<u,f++;return u=f%4*8,a[n=(f-f%4)/4]=a[n]|128<<u,a[e-2]=t<<3,a[e-1]=t>>>29,a}(r=function(r){r=r.replace(/\r\n/g,"\n");for(var n="",t=0;t<r.length;t++){var o=r.charCodeAt(t);o<128?n+=String.fromCharCode(o):o>127&&o<2048?(n+=String.fromCharCode(o>>6|192),n+=String.fromCharCode(63&o|128)):(n+=String.fromCharCode(o>>12|224),n+=String.fromCharCode(o>>6&63|128),n+=String.fromCharCode(63&o|128))}return n}(r)),v=1732584193,d=4023233417,S=2562383102,m=271733878,i=0;i<l.length;i+=16)C=v,c=d,g=S,h=m,d=u(d=u(d=u(d=u(d=a(d=a(d=a(d=a(d=e(d=e(d=e(d=e(d=o(d=o(d=o(d=o(d,S=o(S,m=o(m,v=o(v,d,S,m,l[i+0],7,3614090360),d,S,l[i+1],12,3905402710),v,d,l[i+2],17,606105819),m,v,l[i+3],22,3250441966),S=o(S,m=o(m,v=o(v,d,S,m,l[i+4],7,4118548399),d,S,l[i+5],12,1200080426),v,d,l[i+6],17,2821735955),m,v,l[i+7],22,4249261313),S=o(S,m=o(m,v=o(v,d,S,m,l[i+8],7,1770035416),d,S,l[i+9],12,2336552879),v,d,l[i+10],17,4294925233),m,v,l[i+11],22,2304563134),S=o(S,m=o(m,v=o(v,d,S,m,l[i+12],7,1804603682),d,S,l[i+13],12,4254626195),v,d,l[i+14],17,2792965006),m,v,l[i+15],22,1236535329),S=e(S,m=e(m,v=e(v,d,S,m,l[i+1],5,4129170786),d,S,l[i+6],9,3225465664),v,d,l[i+11],14,643717713),m,v,l[i+0],20,3921069994),S=e(S,m=e(m,v=e(v,d,S,m,l[i+5],5,3593408605),d,S,l[i+10],9,38016083),v,d,l[i+15],14,3634488961),m,v,l[i+4],20,3889429448),S=e(S,m=e(m,v=e(v,d,S,m,l[i+9],5,568446438),d,S,l[i+14],9,3275163606),v,d,l[i+3],14,4107603335),m,v,l[i+8],20,1163531501),S=e(S,m=e(m,v=e(v,d,S,m,l[i+13],5,2850285829),d,S,l[i+2],9,4243563512),v,d,l[i+7],14,1735328473),m,v,l[i+12],20,2368359562),S=a(S,m=a(m,v=a(v,d,S,m,l[i+5],4,4294588738),d,S,l[i+8],11,2272392833),v,d,l[i+11],16,1839030562),m,v,l[i+14],23,4259657740),S=a(S,m=a(m,v=a(v,d,S,m,l[i+1],4,2763975236),d,S,l[i+4],11,1272893353),v,d,l[i+7],16,4139469664),m,v,l[i+10],23,3200236656),S=a(S,m=a(m,v=a(v,d,S,m,l[i+13],4,681279174),d,S,l[i+0],11,3936430074),v,d,l[i+3],16,3572445317),m,v,l[i+6],23,76029189),S=a(S,m=a(m,v=a(v,d,S,m,l[i+9],4,3654602809),d,S,l[i+12],11,3873151461),v,d,l[i+15],16,530742520),m,v,l[i+2],23,3299628645),S=u(S,m=u(m,v=u(v,d,S,m,l[i+0],6,4096336452),d,S,l[i+7],10,1126891415),v,d,l[i+14],15,2878612391),m,v,l[i+5],21,4237533241),S=u(S,m=u(m,v=u(v,d,S,m,l[i+12],6,1700485571),d,S,l[i+3],10,2399980690),v,d,l[i+10],15,4293915773),m,v,l[i+1],21,2240044497),S=u(S,m=u(m,v=u(v,d,S,m,l[i+8],6,1873313359),d,S,l[i+15],10,4264355552),v,d,l[i+6],15,2734768916),m,v,l[i+13],21,1309151649),S=u(S,m=u(m,v=u(v,d,S,m,l[i+4],6,4149444226),d,S,l[i+11],10,3174756917),v,d,l[i+2],15,718787259),m,v,l[i+9],21,3951481745),v=t(v,C),d=t(d,c),S=t(S,g),m=t(m,h);return(f(v)+f(d)+f(S)+f(m)).toLowerCase()};
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
                        <Col span={2} style={{ margin: '10px auto' }}>
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
