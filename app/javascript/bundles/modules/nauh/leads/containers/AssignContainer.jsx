import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AssignScreen from '../components/Assign/AssignScreen'
import * as actions from '../actions/assignActions'

const AssignContainer = ({ actions, assignState, sharedState, location }) => {
  return (
    <AssignScreen {...{actions, assignState, sharedState, location }} />
  );
}

function mapStateToProps(state) {
  return { 
    assignState: state.assignState,
    sharedState: state.sharedState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(AssignContainer)