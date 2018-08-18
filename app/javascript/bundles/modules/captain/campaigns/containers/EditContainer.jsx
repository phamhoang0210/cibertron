import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import EditScreen from '../components/Edit/EditScreen'
import * as actions from '../actions/editActions'

const EditContainer = ({ actions, editState, params, location }) => {
  return (
    <EditScreen {...{actions, editState, params, location }} />
  );
}

function mapStateToProps(state) {
  return { 
    editState: state.editState,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)