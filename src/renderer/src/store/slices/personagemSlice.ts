import { createSlice } from '@reduxjs/toolkit'

const personagemSlice = createSlice({
  name: 'personagem',
  initialState: {
    idPersonagem: 0
  },
  reducers: {
    selecionarPersonagem(state, action) {
      state.idPersonagem = action.payload
    }
  }
})

export const { selecionarPersonagem } = personagemSlice.actions

export default personagemSlice.reducer
