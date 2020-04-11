import {
  CREATE_ACCOUNT,
} from './../constants/actionTypes';
import initialState from './initialState';

export default function accountNewReducer($$state = initialState.accountNew, action) {
  const { type, error } = action;

  switch (type) {
    case `${CREATE_ACCOUNT}_PROCESS`: {
      return $$state.merge({
        isUpdating: true,
      });
    }

    // #issue hard conding
    case `${CREATE_ACCOUNT}_SUCCESS`: {
      return $$state.merge({
        isUpdating: false,
        isUpdateSuccess: true,
      });
    }

    case `${CREATE_ACCOUNT}_FAILURE`: {
      return $$state.merge({
        isUpdating: false,
        isUpdateFailure: true,
        createError: error
      });
    }

    default: {
      return $$state;
    }
  }
}
