import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePersonagem,
  getPersonagem,
  getTodosPersonagens,
  postPersonagem,
  putPersonagem
} from '../services/PersonagemService'
import { ICriatura } from '../@types/t20/Criatura'

ipcMain.handle('get-todos-personagens', async (event: IpcMainInvokeEvent) => {
  event.defaultPrevented
  return await getTodosPersonagens()
})

ipcMain.handle('get-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  event.defaultPrevented
  return await getPersonagem(id)
})

ipcMain.handle('post-personagem', async (event: IpcMainInvokeEvent, _personagem: ICriatura) => {
  event.defaultPrevented
  return await postPersonagem(_personagem)
})

ipcMain.handle('put-personagem', async (event: IpcMainInvokeEvent, _personagem: ICriatura) => {
  event.defaultPrevented
  return await putPersonagem(_personagem)
})

ipcMain.handle('delete-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  event.defaultPrevented
  await deletePersonagem(id)
})
