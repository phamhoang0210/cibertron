import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VersionScreen from '../components/Version/VersionScreen'
import * as actions from '../actions/versionActions'

const VersionContainer = ({actions, versionState, params, sharedState}) => {
  return(
    <VersionScreen {...{actions, versionState, params, sharedState}} />
  );
}

function mapStateToProps(state) {
  return {
    versionState: state.versionState,
    sharedState: state.sharedState,
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(VersionContainer)