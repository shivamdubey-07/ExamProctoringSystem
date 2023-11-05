import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import userDataSlice from './Slices/userDataSlice'
import resultSlice from './Slices/resultSlice'

export const store = configureStore({
  reducer:{
    user:userSlice,
    userData:userDataSlice,
    counts:resultSlice
  }
})