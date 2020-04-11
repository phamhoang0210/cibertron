import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Form, Input } from 'antd';

const ITEM_LAYOUT = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

class NameInputText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { form, intl, name } = this.props;

    return (
      <Form.Item
        label={intl.formatMessage({id: 'label.attrs.name'})}
        {...ITEM_LAYOUT}
      >
        {form.getFieldDecorator('name', {
          initialValue: name,
           rules: [
            { required: true, message: intl.formatMessage({id: 'errors.required.name'}) },
            { validator:this.mess },
            { max: 68, message: intl.formatMessage({id: 'errors.length.name'}) }
          ],
        })(<Input placeholder="name..." />)}
      </Form.Item>
    );
  }
}

NameInputText.propTypes = {
  name: PropTypes.string,
  form: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(NameInputText);
