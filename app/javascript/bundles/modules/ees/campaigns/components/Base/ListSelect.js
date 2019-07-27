import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Immutable from 'immutable';
import { Form, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { DEFAULT_FORM_ITEM_LAYOUT } from 'app/constants/form'

class ListSelect extends React.Component {
  constructor(props) {
    super(props);
    this.fetchLists = debounce(this.fetchLists, 800);
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchLists = this.fetchLists.bind(this);
  }

  componentDidMount() {
    this.fetchLists();
  }

  fetchLists = (options = {}) => {
    const { fetchLists } = this.props;
    fetchLists(
      options
    );
  };

  handleSearch = (value) => {
    this.fetchLists({fields: 'name,id', compconds: {'name.like': `%${value}%`} });
  };

  render() {
    const { list_id, lists, form, intl } = this.props;
    return (
      <Form.Item
      label={intl.formatMessage({id: 'attrs.list.label'})}
      {...DEFAULT_FORM_ITEM_LAYOUT}
      >
      {form.getFieldDecorator('list_id', {
          initialValue: list_id,
          rules: [{
                  required: true,
                  message: intl.formatMessage(
                  {id: 'attrs.list.errors.required'},
                  ),
                }]
      })(
          <Select
            showSearch
            allowClear
            notFoundContent={lists && lists.get('isFetching') ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.handleSearch}
          >
          {lists && lists.map((list) => (
              <Select.Option value={`${list.get('id')}`} key={list.get('id')}>
                {`${list.get('name')}`}
              </Select.Option>
          ))}
          </Select>
      )}
      </Form.Item>
    );
  }
}

ListSelect.propTypes = {
  list_id: PropTypes.string,
  lists: PropTypes.instanceOf(Immutable.List),
  params: PropTypes.object,
  fetchLists: PropTypes.func,
  form: PropTypes.object,
  intl: PropTypes.object,
};

ListSelect.defaultProps = {
  fetchLists: () => {},
};

ListSelect.contextTypes = {
  company_id: PropTypes.string,
  user_id: PropTypes.string,
};

export default injectIntl(ListSelect);
