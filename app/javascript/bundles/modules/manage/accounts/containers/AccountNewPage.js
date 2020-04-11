import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountNewActions from './../actions/accountNew';
import AccountNew from './../components/AccountNew';

export class AccountNewPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AccountNew {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { accountNew } = state;

  return {
    accountNew
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    accountNewActions,
    dispatch
  );

  return { ...actions };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountNewPage);
