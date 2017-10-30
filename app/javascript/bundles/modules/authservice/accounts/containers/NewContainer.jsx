import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import NewScreen from '../components/New/NewScreen'
import * as actions from '../actions/newActions'

const NewContainer = ({ actions, newState, sharedState }) => {
  return (
    <NewScreen {...{actions, newState, sharedState }} />
  );
}

function mapStateToProps(state) {
  return { 
    newState: state.newState,
    sharedState: state.sharedState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(NewContainer)