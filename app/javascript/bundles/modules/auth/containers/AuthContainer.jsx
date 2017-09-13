import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AuthScreen from '../components/Auth/AuthScreen'
import * as actions from '../actions/authActions'

const AuthContainer = ({ actions, authState }) => {
  return (
    <AuthScreen {...{actions, authState}} />
  );
}

function mapStateToProps(state) {
  return { 
    authState: state.authState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)