import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IndexScreen from '../components/Index/IndexScreen'
import * as actions from '../actions/indexActions'

const IndexContainer = ({ actions, indexState, sharedState, railsContextState, location, newState}) => {
  return (
    <IndexScreen {...{actions, indexState, sharedState, railsContextState, location, newState}} />
  );
}

function mapStateToProps(state) {
  return { 
    indexState: state.indexState,
    sharedState: state.sharedState,
    railsContextState: state.railsContextState,
    newState: state.newState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)