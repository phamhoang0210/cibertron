import authReducer, { initialState as authState } from './authReducer'
import authSignInReducer, { initialState as authSignInState } from './authSignInReducer'
import authSignUpReducer, { initialState as authSignUpState } from './authSignUpReducer'
import authSignOutReducer, { initialState as authSignOutState } from './authSignOutReducer'

export default {
  authState: authReducer,
  authSignInState: authSignInReducer,
  authSignUpState: authSignUpReducer,
  authSignOutState: authSignOutReducer,
}

export const initialStates = {
  authState,
  authSignInState,
  authSignUpState,
  authSignOutState,
}
