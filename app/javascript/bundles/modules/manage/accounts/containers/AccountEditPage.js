import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountEditActions from './../actions/accountEdit';
import AccountEdit from './../components/AccountEdit';

export class AccountEditPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AccountEdit {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { account } = state;

  return {
    account
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    accountEditActions,
    dispatch
  );

  return { ...actions };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountEditPage);
