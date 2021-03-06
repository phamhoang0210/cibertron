import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { injectIntl } from 'react-intl';
import CreateButton from 'partials/base/CreateButton';
import NameInputText from 'partials/base/NameInputText';
import EmailInputText from 'partials/base/EmailInputText';
import PasswordInput from 'partials/base/PasswordInput';
import PasswordConfirmInput from 'partials/base/PasswordConfirmInput';
import { Form, Input, Col, Row, Button, message} from 'antd';

class AccountNewForm extends React.Component {
  constructor(props) {
    super(props);

    _.bindAll(this, [
      'handleSubmit',
      'notiMessage'
    ]);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, submitAccount } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        submitAccount(
          { ...values },
          { successcallback: this.notiMessage, context: this.context}
        );
      }
    });
  }

  notiMessage() {
    message.success([this.props.intl.formatMessage({id: 'success.created.account'})]);
    this.props.form.resetFields();
  }

  render() {
    const { 
      intl,
      isFetching,
      account,
      form,
      isCreating,
    } = this.props;

    return (
        <div className="main-content-form-box">
        {
          isFetching && (
            <div className="main-content-form-box-loading-box">
              <Spin />
            </div>
          )
        }
        <Row>
          <Col span={10}>
            <Form onSubmit={this.handleSubmit} layout="horizontal">
              <NameInputText
                name={account.get('name')}
                form={form}
              />
              <EmailInputText
                email={account.get('email')}
                form={form}
              />
             <PasswordInput
                password={account.get('password')}
                form={form}
             />
             <PasswordConfirmInput 
                password_confirmation={account.get('password_confirmation')}
                form={form}
             />
              <CreateButton 
                isCreating={isCreating}
                cancelButton
              />
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

AccountNewForm.propTypes = {
  account: PropTypes.instanceOf(Immutable.Map),
  params: PropTypes.object,
  intl: PropTypes.object,
  isCreating: PropTypes.bool,
  isFetching: PropTypes.bool,
  form: PropTypes.object,
  submitAccount: PropTypes.func,
};

export default Form.create()(injectIntl(AccountNewForm));

