import { createAsyncThunk } from '@reduxjs/toolkit'
import productApi from 'src/api/product.api'
import purchasesApi from 'src/api/purchases.api'
import { payloadCreator } from 'src/utils/helper'

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  payloadCreator(productApi.getProductDetail)
)
export const addToCart = createAsyncThunk(
  'productDetail/addToCart',
  payloadCreator(purchasesApi.addToCart)
)
