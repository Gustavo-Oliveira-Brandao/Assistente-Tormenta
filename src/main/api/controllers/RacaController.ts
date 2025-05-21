import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { getRacasDefault } from '../services/RacaService'

ipcMain.handle('get-racas-default', async (event: IpcMainInvokeEvent) => {
  console.log(`FrameID:${event.frameId}`)
  return await getRacasDefault()
})
