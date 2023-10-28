import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import userDataSlice from './Slices/userDataSlice'

export const store = configureStore({
  reducer:{
    user:userSlice,
    userData:userDataSlice
  }
})