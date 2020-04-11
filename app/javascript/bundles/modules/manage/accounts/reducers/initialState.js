import Immutable from 'immutable'
import {
 DEFAULT_RECORDS,
 DEFAULT_RECORD,
 ACCOUNT,
} from './../constants/initials';

export default {
	accounts: Immutable.fromJS({
		...DEFAULT_RECORDS,
	}),
	accountNew: Immutable.fromJS({
		...DEFAULT_RECORD,
		record: ACCOUNT,
	}),
}