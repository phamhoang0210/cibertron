import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RestoreScreen from '../components/Restore/RestoreScreen'
import * as actions from '../actions/restoreActions'

const RestoreContainer = ({ actions, restoreState, params, sharedState }) => {
  return (
    <RestoreScreen {...{actions, restoreState, params, sharedState }} />
  );
}

function mapStateToProps(state) {
  return { 
    restoreState: state.restoreState,
    sharedState: state.sharedState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(RestoreContainer)