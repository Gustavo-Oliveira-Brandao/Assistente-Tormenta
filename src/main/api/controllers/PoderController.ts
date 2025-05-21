import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePoder,
  getPoderesDefault,
  getPoderesPorClasse,
  getPoderesPorPersonagem,
  postPoder
} from '../services/PoderService'
import { Poder } from '../entities/Poder'

ipcMain.handle('get-poderes-default', async (event: IpcMainInvokeEvent) => {
  console.log(`FrameID:${event.frameId}`)
  return await getPoderesDefault()
})

ipcMain.handle(
  'get-poderes-personagem',
  async (event: IpcMainInvokeEvent, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    return await getPoderesPorPersonagem(_idPersonagem)
  }
)

ipcMain.handle('get-poderes-classe', async (event: IpcMainInvokeEvent, _idClasse: number) => {
  console.log(`FrameID:${event.frameId}`)
  return await getPoderesPorClasse(_idClasse)
})

ipcMain.handle(
  'post-poder',
  async (event: IpcMainInvokeEvent, _poder: Partial<Poder>, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    await postPoder(_poder, _idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deletePoder(_id)
})
