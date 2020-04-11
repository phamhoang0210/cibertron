import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { injectIntl } from 'react-intl';
import CreateButton from 'partials/base/CreateButton';
import NameInputText from 'partials/base/NameInputText';
import EmailInputText from 'partials/base/EmailInputText';
import PasswordInput from 'partials/base/PasswordInput';
import { Form, Input, Col, Row, Button } from 'antd';

class AccountNewForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
                name={account.get('password')}
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
  form: PropTypes.object,
};

export default Form.create()(injectIntl(AccountNewForm));

