import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchAccounts,
  deleteAccount,
} from './../actions/accounts';
import AccountIndex from './../components/AccountIndex';

export class AccountIndexPage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <AccountIndex {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { accounts } = state;

  return {
    accounts
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    {
      fetchAccounts,
      deleteAccount,
    },
    dispatch
  );

  return { ...actions };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountIndexPage);