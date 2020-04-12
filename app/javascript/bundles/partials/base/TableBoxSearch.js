import React from 'react';
import PropTypes from 'prop-types';
import {Row, Input, Col, Button} from 'antd';
import ContextLink from './ContextLink'; 
import { replaceStr } from 'helpers/applicationHelper';

class TableBoxSearch extends React.Component {
  constructor(props) {
  super(props);
}

renderContextLink(contextLinks) {
  return(
    <Col span={8}>
      {contextLinks && contextLinks.map(record => (
        <ContextLink
          key={record['path']}
          to={this.props.rewriteLink(record['path'], record['params'])}
          className=""
          style={{marginRight: 5}}
        >
          <Button>{record['title']}</Button>
        </ContextLink>
      ))}
    </Col>
  );
}
render() {
  const { onSearch, contextLinks, placeholder, defaultValue } = this.props;
  return (
    <Row className="main-content-table-box-tools">
      {this.renderContextLink(contextLinks)}
      <Col span={8} offset={8}>
        <Input.Group className="ant-search-input">
          <Input.Search
            placeholder={placeholder}
            onSearch={onSearch}
            defaultValue={defaultValue}
          />
        </Input.Group>
      </Col>
    </Row>
  );
  }
}

TableBoxSearch.propTypes = {
  onSearchFunction: PropTypes.func,
  contextLinks: PropTypes.array,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  rewriteLink: PropTypes.func,
};

TableBoxSearch.defaultProps = {
  rewriteLink: replaceStr,
};

export default TableBoxSearch;
