import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Immutable from 'immutable';
import AccountEditForm from './AccountEditForm';

class AccountEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fetchAccount,
      params,
      intl,
      account,
      updateAccount
    } = this.props;

    return (
      <div className="main-content box">
        <div className="box-header">
          <h1 className="box-title">
            {intl.formatMessage({id: 'label.modules.editAccount'})}
          </h1>
        </div>
        <div className="box-body">
          <AccountEditForm
            fetchAccount={fetchAccount}
            params={params}
            account={account.get('record')}
            isUpdating={account.get('isUpdating')}
            isFetching={account.get('isFetching')}
            updateAccount={updateAccount}
          />
        </div>
      </div>
    );
  }
}

AccountEdit.propTypes = {
  fetchAccount: PropTypes.func,
  updateAccount: PropTypes.func,
  params: PropTypes.object,
  intl: PropTypes.object,
  account: PropTypes.instanceOf(Immutable.Map),
};

export default injectIntl(AccountEdit);
