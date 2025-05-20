import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Pericia } from '../entities/Pericia'
import { putPericia } from '../services/PericiaService'

ipcMain.handle('put-pericia', async (event: IpcMainInvokeEvent, _pericia: Pericia) => {
  console.log(`FrameID:${event.frameId}`)
  await putPericia(_pericia)
})
