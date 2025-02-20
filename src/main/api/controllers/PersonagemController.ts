import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePersonagem,
  getPersonagem,
  getTodosPersonagens,
  postPersonagem,
  putPersonagem
} from '../services/PersonagemService'
import { IPersonagem } from '../@types/t20/Personagem'

ipcMain.handle('get-todos-personagens', async (event: IpcMainInvokeEvent) => {
  console.log(event)
  return await getTodosPersonagens()
})

ipcMain.handle('get-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  console.log(event)
  return await getPersonagem(id)
})

ipcMain.handle('post-personagem', async (event: IpcMainInvokeEvent, _personagem: IPersonagem) => {
  console.log(event)
  return await postPersonagem(_personagem)
})

ipcMain.handle('put-personagem', async (event: IpcMainInvokeEvent, _personagem: IPersonagem) => {
  console.log(event)
  return await putPersonagem(_personagem)
})

ipcMain.handle('delete-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  console.log(event)
  await deletePersonagem(id)
})
