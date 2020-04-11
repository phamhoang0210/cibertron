import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Form, Button, Icon } from 'antd';
import { browserHistory } from 'react-router';

class CreateButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleGoBack(e) {
    e.preventDefault();

    browserHistory.goBack();
  }

  // #issue back button
  render() {
    const { intl, isCreating, cancelButton } = this.props;

    return (
      <Form.Item style={{float: 'right'}}>
        {this.props.children}
        <Button type="primary" htmlType="submit" loading={isCreating}>
          {intl.formatMessage({id: 'form.button.create'})}
        </Button>
        { cancelButton &&
          <Button type="default"
            onClick={this.handleGoBack}>
            {intl.formatMessage({id: 'form.button.cancel'})}
          </Button>
        }
      </Form.Item>
    );
  }
}

CreateButton.propTypes = {
  intl: PropTypes.object,
  isCreating: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default injectIntl(CreateButton);
