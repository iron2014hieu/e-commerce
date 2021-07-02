import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import purchasesApi from 'src/api/purchases.api'
import { payloadCreator } from 'src/utils/helper'
import { logout } from '../Auth/auth.slice'

export const getCartPurChases = createAsyncThunk(
  'cart/getCartPurchases',
  payloadCreator(purchasesApi.getCartPurChases)
)
export const updatePurChase = createAsyncThunk(
  'cart/updatePurChase',
  payloadCreator(purchasesApi.updatePurChase)
)
export const deletePurchases = createAsyncThunk(
  'cart/deletePurchases',
  payloadCreator(purchasesApi.deletePurchases)
)
export const buyPurchases = createAsyncThunk(
  'cart/buyPurchases',
  payloadCreator(purchasesApi.buyPurchases)
)
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    purchases: []
  },
  extraReducers: {
    [getCartPurChases.fulfilled]: (state, action) => {
      state.purchases = action.payload.data
    },
    [logout.fulfilled]: state => {
      state.purchases = []
    }
  }
})
const { reducer: cartReducer } = cartSlice
export default cartReducer
