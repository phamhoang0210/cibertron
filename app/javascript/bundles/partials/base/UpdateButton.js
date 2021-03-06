import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Form, Button, Icon } from 'antd';
import { browserHistory } from 'react-router';

class UpdateButton extends React.Component {
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
    const { intl, isUpdating, cancelButton } = this.props;

    return (
      <Form.Item style={{float: 'right'}}>
        {this.props.children}
        <Button type="primary" htmlType="submit" loading={isUpdating}>
          {intl.formatMessage({id: 'form.button.update'})}
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

UpdateButton.propTypes = {
  intl: PropTypes.object,
  isUpdating: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default injectIntl(UpdateButton);
