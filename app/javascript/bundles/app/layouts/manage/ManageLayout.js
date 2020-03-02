import React from 'react'

class ManageLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div className="layout-wraper">
        {this.props.children}
      </div>
    );
  }
}

export default ManageLayout