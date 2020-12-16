import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    status: 'disconnected'
  },
  reducers: {
    validateUser: (state, action) => {
      state.email = action.payload.email
      state.password = action.payload.password
      if (state.email == 'robinson' && state.password == 'password'){
        state.status = 'connected'
      } else {
        state.status = 'disconnected'
      }
      return
    },
  }
})

export const { validateUser } = loginSlice.actions

export const validateUserAsync = user => dispatch => {
    setTimeout(() => {
      dispatch(validateUser(user))
    }, 1000)
  }

export default loginSlice.reducer