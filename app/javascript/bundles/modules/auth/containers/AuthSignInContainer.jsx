import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AuthSignInScreen from '../components/AuthSignIn/AuthSignInScreen'
import * as actions from '../actions/authSignInActions'

const AuthSignInContainer = ({ actions, authSignInState, location }) => {
  return (
    <AuthSignInScreen {...{actions, authSignInState, location }} />
  );
}

function mapStateToProps(state) {
  return { 
    authSignInState: state.authSignInState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(AuthSignInContainer)