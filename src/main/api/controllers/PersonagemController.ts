import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePersonagem,
  deletePoder,
  getPersonagem,
  getTodosPersonagens,
  postPersonagem,
  postPoder,
  putPersonagem
} from '../services/PersonagemService'
import { IPersonagem } from '../@types/t20/Personagem'
import { IPoder } from '../@types/t20/Poder'

ipcMain.handle('get-todos-personagens', async (event: IpcMainInvokeEvent) => {
  event.defaultPrevented
  return await getTodosPersonagens()
})

ipcMain.handle('get-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  event.defaultPrevented
  return await getPersonagem(id)
})

ipcMain.handle('post-personagem', async (event: IpcMainInvokeEvent, _personagem: IPersonagem) => {
  event.defaultPrevented
  return await postPersonagem(_personagem)
})

ipcMain.handle('put-personagem', async (event: IpcMainInvokeEvent, _personagem: IPersonagem) => {
  event.defaultPrevented
  return await putPersonagem(_personagem)
})

ipcMain.handle('delete-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  event.defaultPrevented
  await deletePersonagem(id)
})

ipcMain.handle(
  'post-poder',
  async (event: IpcMainInvokeEvent, _poder: IPoder, idPersonagem: number) => {
    event.defaultPrevented
    await postPoder(_poder, idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, id: number) => {
  event.defaultPrevented
  await deletePoder(id)
})
