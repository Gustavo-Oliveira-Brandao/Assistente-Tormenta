import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { deletePoder, getPoderesDefault, postPoder } from '../services/PoderService'
import { Poder } from '../entities/Poder'
import { DeepPartial } from 'typeorm'

ipcMain.handle('get-poderes-default', async (event: IpcMainInvokeEvent) => {
  console.log(`FrameID:${event.frameId}`)
  const poderes = await getPoderesDefault()
  return poderes
})

ipcMain.handle(
  'post-poder',
  async (event: IpcMainInvokeEvent, _poder: DeepPartial<Poder>, _idNivel: number) => {
    console.log(`FrameID:${event.frameId}`)
    await postPoder(_poder, _idNivel)
  }
)

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deletePoder(_id)
})
