import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AuthSignOutScreen from '../components/AuthSignOut/AuthSignOutScreen'
import * as actions from '../actions/authSignOutActions'

const AuthSignOutContainer = ({ actions, authSignOutState, location }) => {
  return (
    <AuthSignOutScreen {...{actions, authSignOutState, location }} />
  );
}

function mapStateToProps(state) {
  return { 
    authSignOutState: state.authSignOutState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(AuthSignOutContainer)