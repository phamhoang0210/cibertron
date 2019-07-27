import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Immutable from 'immutable';
import { Form, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { DEFAULT_FORM_ITEM_LAYOUT } from 'app/constants/form'

class TemplateSelect extends React.Component {
  constructor(props) {
    super(props);
    this.fetchTemplates = debounce(this.fetchTemplates, 800);
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchTemplates = this.fetchTemplates.bind(this);
  }

  componentDidMount() {
    this.fetchTemplates();
  }

  fetchTemplates = (options = {}) => {
    const { fetchTemplates } = this.props;
    fetchTemplates(
      options
    );
  };

  handleSearch = (value) => {
    this.fetchTemplates({fields: 'name,id', compconds: {'name.like': `%${value}%`} });
  };

  render() {
    const { template_id, templates, form, intl } = this.props;
    return (
      <Form.Item
      label={intl.formatMessage({id: 'attrs.template.label'})}
      {...DEFAULT_FORM_ITEM_LAYOUT}
      >
      {form.getFieldDecorator('template_id', {
          initialValue: template_id,
          rules: [{
                  required: true,
                  message: intl.formatMessage(
                  {id: 'attrs.template.errors.required'},
                  ),
                }]
      })(
          <Select
            showSearch
            allowClear
            notFoundContent={templates && templates.get('isFetching') ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.handleSearch}
          >
          {templates && templates.map((template) => (
              <Select.Option value={`${template.get('id')}`} key={template.get('id')}>
                {`${template.get('name')}`}
              </Select.Option>
          ))}
          </Select>
      )}
      </Form.Item>
    );
  }
}

TemplateSelect.propTypes = {
  template_id: PropTypes.string,
  templates: PropTypes.instanceOf(Immutable.List),
  params: PropTypes.object,
  fetchTemplates: PropTypes.func,
  form: PropTypes.object,
  intl: PropTypes.object,
};

TemplateSelect.defaultProps = {
  fetchTemplates: () => {},
};

TemplateSelect.contextTypes = {
  company_id: PropTypes.string,
  user_id: PropTypes.string,
};

export default injectIntl(TemplateSelect);
