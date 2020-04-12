import {
  DELETE_ACCOUNT,
} from './../constants/actionTypes';
import initialState from './initialState';

export default function accountDeleteReducer($$state = initialState.accounts, action) {
  const { type } = action;

  switch (type) {
    case `${DELETE_ACCOUNT}_PROCESS`: {
      return $$state.merge({
        isDeleting: true,
      });
    }

    case `${DELETE_ACCOUNT}_SUCCESS`: {
      return $$state.merge({
        isDeleting: false,
        isDeleteSuccess: true,
      });
    }

    case `${DELETE_ACCOUNT}_FAILURE`: {
      return $$state.merge({
        isDeleting: false,
        isDeleteFailure: true,
      });
    }

    default: {
      return $$state;
    }
  }
}
