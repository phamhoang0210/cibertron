import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HistoryScreen from '../components/History/HistoryScreen'
import * as actions from '../actions/historyActions'

const HistoryContainer = ({ actions, historyState, params, sharedState }) => {
  return (
    <HistoryScreen {...{actions, historyState, params, sharedState }} />
  );
}

function mapStateToProps(state) {
  return { 
    historyState: state.historyState,
    sharedState: state.sharedState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}


// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)