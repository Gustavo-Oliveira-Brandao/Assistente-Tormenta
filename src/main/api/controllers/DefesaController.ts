import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IDefesa } from '../@types/t20/Defesa'
import { putDefesa } from '../services/DefesaService'

ipcMain.handle('put-defesa', async (event: IpcMainInvokeEvent, defesa: IDefesa) => {
  event.defaultPrevented
  await putDefesa(defesa)
})
