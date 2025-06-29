import { combineReducers, configureStore } from '@reduxjs/toolkit'
import personagemReducer from './slices/personagemSlice'

const store = configureStore({
  reducer: combineReducers({
    personagem: personagemReducer
  })
})

export default store
export type RootState = ReturnType<typeof store.getState>
