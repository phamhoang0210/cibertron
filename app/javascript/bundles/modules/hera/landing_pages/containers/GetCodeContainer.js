import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import GetCodeScreen from '../components/GetCode/GetCodeScreen'
import * as actions from '../actions/getCodeActions'

const GetCodeContainer = ({ actions, getCodeState, params, sharedState }) => {
  return (
    <GetCodeScreen {...{actions, getCodeState, params, sharedState }} />
  );
}

function mapStateToProps(state) {
  return { 
    getCodeState: state.getCodeState,
    sharedState: state.sharedState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(GetCodeContainer)