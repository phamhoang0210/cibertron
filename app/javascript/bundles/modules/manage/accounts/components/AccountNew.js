import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { injectIntl } from 'react-intl';
import AccountNewForm from './AccountNewForm';

class Accountnew extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { intl, accountNew, submitAccount } = this.props;

    return (
      <div className="main-content box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'label.modules.accountCreate'})}
          </h1>
        </div>
        <div className="box-body">
          <AccountNewForm
            account={accountNew.get('record')}
            isCreating={accountNew.get('isCreating')}
            isFetching={accountNew.get('isFetching')}
            submitAccount={submitAccount}
          />
        </div>
      </div>
    );
  }
}

Accountnew.propTypes = {
  submitAccount: PropTypes.func,
  params: PropTypes.object,
  intl: PropTypes.object,
  accountNew: PropTypes.instanceOf(Immutable.Map),
};

export default injectIntl(Accountnew);
