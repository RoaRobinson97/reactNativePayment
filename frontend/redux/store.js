import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import signupReducer from '../features/signup/signUpSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
  }
})