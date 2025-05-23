import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePoder,
  getPoderesDefault,
  getPoderesPorClasse,
  getPoderesPorPersonagem,
  postPoder
} from '../services/PoderService'
import { Poder } from '../entities/Poder'
import { DeepPartial } from 'typeorm'

ipcMain.handle('get-poderes-default', async (event: IpcMainInvokeEvent) => {
  console.log(`FrameID:${event.frameId}`)
  const poderes = await getPoderesDefault()
  return poderes
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
  async (event: IpcMainInvokeEvent, _poder: DeepPartial<Poder>, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    await postPoder(_poder, _idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deletePoder(_id)
})
