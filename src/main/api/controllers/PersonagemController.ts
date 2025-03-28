import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePersonagem,
  getPersonagem,
  getTodosPersonagens,
  postPersonagem,
  putPersonagem
} from '../services/PersonagemService'
import { ICriatura } from '../@types/t20/Criatura'
import { DeepPartial } from 'typeorm'

ipcMain.handle('get-todos-personagens', async (event: IpcMainInvokeEvent) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  return await getTodosPersonagens()
})

ipcMain.handle('get-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  return await getPersonagem(id)
})

ipcMain.handle(
  'post-personagem',
  async (event: IpcMainInvokeEvent, _personagem: DeepPartial<ICriatura>) => {
    console.log(`Evento recebido com frameID: ${event.frameId}`)
    return await postPersonagem(_personagem)
  }
)

ipcMain.handle('put-personagem', async (event: IpcMainInvokeEvent, _personagem: ICriatura) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  return await putPersonagem(_personagem)
})

ipcMain.handle('delete-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  await deletePersonagem(id)
})
