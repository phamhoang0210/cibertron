import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DashboardScreen from '../components/Dashboard/DashboardScreen'
import * as actions from '../actions/dashboardActions'

const DashboardContainer = ({ actions, dashboardState }) => {
  return (
    <DashboardScreen {...{actions, dashboardState}} />
  );
}

function mapStateToProps(state) {
  return {
    dashboardState: state.dashboardState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)