import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReportScreen from '../components/Report/ReportScreen'
import * as actions from '../actions/reportActions'

const ReportContainer = ({ actions, reportState, sharedState, location }) => {
  return (
    <ReportScreen {...{actions, reportState, sharedState, location }} />
  );
}

function mapStateToProps(state) {
  return { 
    reportState: state.reportState,
    sharedState: state.sharedState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer)