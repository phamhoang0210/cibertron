import Immutable from 'immutable'
import {
 DEFAULT_RECORDS,
} from './../constants/initials';

export default {
	accounts: Immutable.fromJS({
		...DEFAULT_RECORDS,
	}),
}