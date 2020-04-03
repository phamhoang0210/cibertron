import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class ContextLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let to = this.props.to;
    let url = new URL(to, window.location.origin);

    for (let k in this.context){
      if (typeof this.context[k] !== 'function') {
        if (!url.searchParams.get(k) && this.context[k]) {
          url.searchParams.append(k, this.context[k]);
        }
      }
    }

    return (
      <Link {...this.props} to={`${url.pathname}${url.search}`}>
        {this.props.children}
      </Link>
    );
  }
}

ContextLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ContextLink;
