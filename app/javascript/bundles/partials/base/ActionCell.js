import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Button, Popconfirm, Icon } from 'antd';
import { replaceStr } from 'helpers/applicationHelper';
import ContextLink from './ContextLink';

class ActionCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      intl,
      row,
      showShow,
      showDelete,
      showEdit,
      showPath,
      handleDeleteEntity,
      entityPath,
      params
    } = this.props;
    return (
      <div className="text-align--right" style={{whiteSpace : 'nowrap'}}>
        {showEdit && (
          <ContextLink to={replaceStr(entityPath, {...params, id: row.id})} className="">
            <Button className="button-margin--left--default">
              <Icon type="edit" />
            </Button>
          </ContextLink>
        )}
        {showShow && (
          <ContextLink to={replaceStr(showPath, {...params, id: row.id})} className="">
            <Button className="button-margin--left--default">
              <Icon type="eye" />
            </Button>
          </ContextLink>
        )}
        {showDelete && (
          <Popconfirm
            placement="topLeft"
            title={intl.formatMessage({id: 'title.delete'})}
            onConfirm={() => handleDeleteEntity(row.id)}
            okText={intl.formatMessage({id: 'label.button.ok'})}
            cancelText={intl.formatMessage({id: 'label.button.cancel'})}
             >
            <Button type="danger" loading={row.isDeleting}>
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        )}
      </div>
    );
  }
}

ActionCell.propTypes = {
  cell: PropTypes.object,
  row: PropTypes.object,
  intl: PropTypes.object,
  handleDeleteEntity: PropTypes.func,
  entityPath: PropTypes.string,
  showPath: PropTypes.string,
  params: PropTypes.object,
  showShow: PropTypes.bool,
  showDelete: PropTypes.bool,
  showEdit: PropTypes.bool,
};

export default injectIntl(ActionCell);
