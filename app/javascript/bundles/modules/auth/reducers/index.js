import authReducer, { initialState as authState } from './authReducer'
import authSignInReducer, { initialState as authSignInState } from './authSignInReducer'
import authSignUpReducer, { initialState as authSignUpState } from './authSignUpReducer'

export default {
  authState: authReducer,
  authSignInState: authSignInReducer,
  authSignUpState: authSignUpReducer,
}

export const initialStates = {
  authState,
  authSignInState,
  authSignUpState,
}
