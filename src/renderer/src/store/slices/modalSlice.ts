import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalAberto: null
  },
  reducers: {
    abrirModal(state, action) {
      state.modalAberto = action.payload
    },
    fecharModal(state) {
      state.modalAberto = null
    }
  }
})

export const { abrirModal, fecharModal } = modalSlice.actions
export default modalSlice.reducer
