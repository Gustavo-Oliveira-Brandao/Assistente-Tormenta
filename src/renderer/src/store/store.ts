import { combineReducers, configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modalSlice'
import personagemReducer from './slices/personagemSlice'

const store = configureStore({
  reducer: combineReducers({
    modal: modalReducer,
    personagem: personagemReducer
  })
})

export default store
export type RootState = ReturnType<typeof store.getState>
