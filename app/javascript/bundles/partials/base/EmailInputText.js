import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Form, Input } from 'antd';

const ITEM_LAYOUT = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

class EmailInputText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { form, intl, email } = this.props;

    return (
      <Form.Item
        label={intl.formatMessage({id: 'label.attrs.email'})}
        {...ITEM_LAYOUT}
      >
        {form.getFieldDecorator('email', {
          initialValue: email,
          rules: [
            { type: 'email', message: intl.formatMessage({id: 'errors.valid.email'}) },
            { required: true, message: intl.formatMessage({id: 'errors.required.email'}) },
            { validator:this.mess },
            { max: 255, message: intl.formatMessage({id: 'errors.length.email'}) }
          ],
        })(<Input placeholder="Search by email..." />)}
      </Form.Item>
    );
  }
}

EmailInputText.propTypes = {
  email: PropTypes.string,
  form: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(EmailInputText);
