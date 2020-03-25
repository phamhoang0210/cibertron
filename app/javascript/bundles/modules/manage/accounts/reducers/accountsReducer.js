import {
  FETCH_ACCOUNTS,
} from './../constants/actionTypes';
import initialState from './initialState';

export default function accountsReducer($$state = initialState.accounts, action) {

	const { type, payload, error } = action;

	switch (type) {
		case `${FETCH_ACCOUNTS}_PROCESS`: {
			return $$state.merge({
				isFetching: true,
			});
		}

		case `${FETCH_ACCOUNTS}_SUCCESS`: {
			return $$state.merge({
				isFetching: false,
				records: payload.records,
				filters: payload.filters,
			});
		}

		case  `${FETCH_ACCOUNTS}_FAILSE`: {
			return $$state.merge({
				isFetching: false,
				fetchError: error
			});
		}

		default: {
			return $$state;
		}
	}
}