import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePoder,
  getPoderesDefault,
  getPoderesPersonagem,
  postPoder
} from '../services/PoderService'
import { PoderRef } from '../entities/PoderRef'

ipcMain.handle('get-poderes-default', async (event: IpcMainInvokeEvent) => {
  console.log(`FrameID:${event.frameId}`)
  const poderes = await getPoderesDefault()
  return poderes
})

ipcMain.handle(
  'get-poderes-personagem',
  async (event: IpcMainInvokeEvent, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    const poderes = await getPoderesPersonagem(_idPersonagem)
    return poderes
  }
)

ipcMain.handle('post-poder', async (event: IpcMainInvokeEvent, _poder: Partial<PoderRef>, _idPersonagem: number) => {
  console.log(`FrameID:${event.frameId}`)
  await postPoder(_poder, _idPersonagem)
})

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deletePoder(_id)
})
