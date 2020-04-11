import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Form, Input } from 'antd';

const ITEM_LAYOUT = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { form, intl, password } = this.props;

    return (
      <Form.Item
        label={intl.formatMessage({id: 'label.attrs.password'})}
        {...ITEM_LAYOUT}
      >
        {form.getFieldDecorator('password', {
          initialValue: password,
          rules: [
            { required: true, message: intl.formatMessage({id: 'errors.required.email'}) },
            { validator:this.mess },
            { max: 255, message: intl.formatMessage({id: 'errors.length.email'}) }
          ],
        })(<Input type="password" placeholder="* * *"/>)}
      </Form.Item>
    );
  }
}

PasswordInput.propTypes = {
  password: PropTypes.string,
  form: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(PasswordInput);
