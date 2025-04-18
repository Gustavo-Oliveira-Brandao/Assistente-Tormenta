import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IPericia } from '../@types/t20/Pericia'
import { putPericia } from '../services/PericiaService'

ipcMain.handle('put-pericia', async (event: IpcMainInvokeEvent, pericia: IPericia) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  await putPericia(pericia)
})
