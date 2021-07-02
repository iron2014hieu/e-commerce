import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'src/api/auth.api'
import userApi from 'src/api/user.api'
import LocalStorage from 'src/constants/LocalStorage'
import { payloadCreator } from 'src/utils/helper'

export const register = createAsyncThunk(
  'auth/register',
  payloadCreator(authApi.register)
)
export const login = createAsyncThunk(
  'auth/login',
  payloadCreator(authApi.login)
)
export const logout = createAsyncThunk(
  'auth/logout',
  payloadCreator(authApi.logout)
)
export const updateMe = createAsyncThunk(
  'auth/updateMe',
  payloadCreator(userApi.updateMe)
)

const handleAuthFulfilled = (state, action) => {
  const { user, access_token } = action.payload.data
  state.profile = user
  localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
  localStorage.setItem(LocalStorage.accessToken, access_token)
}
const handleUnAuth = state => {
  state.profile = {}
  localStorage.removeItem(LocalStorage.user)
  localStorage.removeItem(LocalStorage.accessToken)
}
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    profile: JSON.parse(localStorage.getItem(LocalStorage.user)) || {}
  },
  reducers: {
    unauthorize: handleUnAuth
  },
  extraReducers: {
    [register.fulfilled]: handleAuthFulfilled,
    [login.fulfilled]: handleAuthFulfilled,
    [logout.fulfilled]: handleUnAuth,
    [updateMe.fulfilled]: (state, action) => {
      state.profile = action.payload.data
      localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
    }
  }
})
const { reducer: authReducer, actions } = authSlice
export const { unauthorize } = actions
export default authReducer
