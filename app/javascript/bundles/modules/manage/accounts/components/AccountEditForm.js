import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import Immutable from 'immutable';
import {
  Form,
  Row,
  Col,
  Spin,
  message,
  Button,
} from 'antd';
import NameInputText from 'partials/base/NameInputText';
import EmailInputText from 'partials/base/EmailInputText';
import PasswordInput from 'partials/base/PasswordInput';
import PasswordConfirmInput from 'partials/base/PasswordConfirmInput';
import UpdateButton from 'partials/base/UpdateButton';
import { browserHistory } from 'react-router';

const BUTTON_LAYOUT = { wrapperCol: { span: 24 } };

class AccountEditForm extends React.Component {
  constructor(props) {
    super(props);

    _.bindAll(this, [
      'handleSubmit',
      'notiMessage'
    ]);
  }

  componentDidMount() {
    this.props.fetchAccount(
      this.props.params.id,
      { context: this.context }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { account, form, updateAccount } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        updateAccount(
          { id: account.get('id'), ...values },
          { successcallback: this.notiMessage}
        );
      }
    });
  }

  handleGoBack(e) {
    e.preventDefault();

    browserHistory.goBack();
  }

  notiMessage() {
    message.success([this.props.intl.formatMessage({id: 'success.update.account'})]);

    browserHistory.goBack();
  }

  render() {
    const {
      account,
      isUpdating,
      isFetching,
      intl,
      form
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
            {account && !account.isEmpty() && (
              <Form onSubmit={this.handleSubmit} layout="horizontal">
                <NameInputText
		              name={account.get('name')}
		              form={form}
		            />
		            <EmailInputText
		              email={account.get('email')}
		              form={form}
		            />
		            <UpdateButton 
		              isUpdating={isUpdating}
		              cancelButton
		            />
              </Form>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

AccountEditForm.propTypes = {
  updateAccount: PropTypes.func,
  params: PropTypes.object,
  account: PropTypes.instanceOf(Immutable.Map),
  intl: PropTypes.object,
  isUpdating: PropTypes.bool,
  isFetching: PropTypes.bool,
  updateAdEvent: PropTypes.func,
  form: PropTypes.object,
};

export default Form.create()(injectIntl(AccountEditForm));
