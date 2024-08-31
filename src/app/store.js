import { configureStore } from '@reduxjs/toolkit'
import companyReducer from '../feature/companySlice'

export const store = configureStore({
  reducer: {
    company: companyReducer,
  },
})