import { createAsyncThunk } from '@reduxjs/toolkit'
import purchasesApi from 'src/api/purchases.api'
import { payloadCreator } from 'src/utils/helper'

export const getPurchases = createAsyncThunk(
  'user/getPurchases',
  payloadCreator(purchasesApi.getPurchases)
)
