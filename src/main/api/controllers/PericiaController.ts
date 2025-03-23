import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IPericia } from '../@types/t20/Pericia'
import { putPericia } from '../services/PericiaService'

ipcMain.handle('put-pericia', async (event: IpcMainInvokeEvent, pericia: IPericia) => {
  event.defaultPrevented
  await putPericia(pericia)
})
