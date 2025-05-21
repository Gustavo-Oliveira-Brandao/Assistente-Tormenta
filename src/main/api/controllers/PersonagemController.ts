import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePersonagem,
  getPersonagem,
  getTodosPersonagem,
  postPersonagem,
  putPersonagem
} from '../services/PersonagemService'
import { Personagem } from '../entities/Personagem'
import { DeepPartial } from 'typeorm'

ipcMain.handle('get-personagens', async (event: IpcMainInvokeEvent) => {
  console.log(`FrameID:${event.frameId}`)
  return await getTodosPersonagem()
})

ipcMain.handle('get-personagem', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  return await getPersonagem(_id)
})

ipcMain.handle(
  'post-personagem',
  async (event: IpcMainInvokeEvent, _personagem: DeepPartial<Personagem>) => {
    console.log(`FrameID:${event.frameId}`)
    await postPersonagem(_personagem)
  }
)

ipcMain.handle('put-personagem', async (event: IpcMainInvokeEvent, _personagem: Personagem) => {
  console.log(`FrameID:${event.frameId}`)
  await putPersonagem(_personagem)
})

ipcMain.handle('delete-personagem', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deletePersonagem(_id)
})
