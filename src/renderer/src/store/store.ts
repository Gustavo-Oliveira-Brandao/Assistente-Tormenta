import { combineReducers, configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modalSlice'

const store = configureStore({
  reducer: combineReducers({
    modal: modalReducer
  })
})

export default store
export type RootState = ReturnType<typeof store.getState>
