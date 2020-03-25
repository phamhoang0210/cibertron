import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import AccountTableBox from './AccountTableBox';

class AccountIndex extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
	};

	render() {
		return (
			<div className="main-content box">
        <div className="box-header">
          <h1 className="box-title">
            "This is title"
          </h1>
        </div>
        <div className="box-body">
          <AccountTableBox {...this.props} />
        </div>
      </div>
		);
	}
}

AccountIndex.PropTypes = {
	intl: PropTypes.object,
	fetchAccounts: PropTypes.func,
}

export default injectIntl(AccountIndex);