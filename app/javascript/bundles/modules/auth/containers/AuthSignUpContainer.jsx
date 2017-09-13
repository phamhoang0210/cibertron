import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AuthSignUpScreen from '../components/AuthSignUp/AuthSignUpScreen'
import * as actions from '../actions/authSignUpActions'

const AuthSignUpContainer = ({ actions, authSignUpState }) => {
  return (
    <AuthSignUpScreen {...{actions, authSignUpState}} />
  );
}

function mapStateToProps(state) {
  return { 
    authSignUpState: state.authSignUpState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(AuthSignUpContainer)