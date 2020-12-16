import { createSlice  } from '@reduxjs/toolkit'

export const signUpSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    _id:'',
    firstname:'',
    lastname:'',
    user: '',
    password: '',
    password2: '',
    error:'',
    response:''
  },
  reducers: {
    setUserData: (state, action) => {
      state._id = action.payload._id,
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
      state.email = action.payload.email
      state.password = action.payload.password
      state.password2 = action.payload.password2
    },
    setResponse: (state, action) => {
        state.response = action.payload.response
    },
    isLoading: (state) => {
      state.loading = true
    },
    isLoaded: (state) => {
      state.loading = false
    },
    setError: (state, action) => {
        state.error = action.payload.message
    },
    removeError: (state) => {
      state.error = ''
  },
  }
})

export default signUpSlice.reducer

//Actions

export const { setUserData, setResponse, setError, isLoading, isLoaded, removeError } = signUpSlice.actions

// Thunk to post user

export function addNewUser(user) {

  return dispatch => {
    dispatch(isLoading())

    setTimeout(() => {
      fetch('http://192.168.1.104:3000/api/register', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        password2: user.password2,
      })
  })
      .then(function (a) {
          return a.json(); // call the json method on the response to get JSON
      })
      .then(function (json) {
          if ("message" in json){
            dispatch(setError(json))
            dispatch(setResponse(json))
            dispatch(isLoaded())
          }else{
            dispatch(setUserData(json.user))
            dispatch(setResponse(json))
            dispatch(isLoaded())
          }

      }).catch( error =>  {
        dispatch(setError(error))
        dispatch(isLoaded())
      }
      )
    }, 5000)


    

}}
