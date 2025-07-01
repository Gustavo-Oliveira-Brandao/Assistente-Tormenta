import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePoder,
  getCompendioPoderes,
  getPoderesPersonagem,
  postPoder
} from '../services/PoderService'
import { DeepPartial } from 'typeorm'
import { Poder } from '../entities/Poder'

ipcMain.handle('get-poderes-default', async (event: IpcMainInvokeEvent) => {
  console.log(`FrameID:${event.frameId}`)
  const poderes = await getCompendioPoderes()
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

ipcMain.handle(
  'post-poder',
  async (event: IpcMainInvokeEvent, _poder: DeepPartial<Poder>, nivelPoder: number, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    await postPoder(_poder,nivelPoder, _idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deletePoder(_id)
})
