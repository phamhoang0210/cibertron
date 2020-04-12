import {
  FETCH_ACCOUNT,
  UPDATE_ACCOUNT,
} from './../constants/actionTypes';
import initialState from './initialState';

export default function accountEditReducer($$state = initialState.account, action) {
  const { type, payload, error } = action;

  switch (type) {
    case `${FETCH_ACCOUNT}_PROCESS`: {
      return $$state.merge({
        isFetching: true
      });
    }

    case `${FETCH_ACCOUNT}_SUCCESS`: {
      return $$state.merge({
        isFetching: false,
        isFetchSuccess: true,
        record: payload
      });
    }

    case `${FETCH_ACCOUNT}_FAILURE`: {
      return $$state.merge({
        isFetching: false,
        isFetchFailure: true,
        fetchError: error
      });
    }

    case `${UPDATE_ACCOUNT}_PROCESS`: {
      return $$state.merge({
        isUpdating: true,
      });
    }

    // #issue hard conding
    case `${UPDATE_ACCOUNT}_SUCCESS`: {
      return $$state.merge({
        isUpdating: false,
        isUpdateSuccess: true,
      }).update('record', record => (
        record.merge(payload)
      ));
    }

    case `${UPDATE_ACCOUNT}_FAILURE`: {
      return $$state.merge({
        isUpdating: false,
        isUpdateFailure: true,
        updateError: error
      });
    }

    default: {
      return $$state;
    }
  }
}
