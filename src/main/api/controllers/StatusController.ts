import { ipcMain } from 'electron'
import { IStatus } from '../../@types/T20 GOTY/IStatus'
import { putStatus } from '../services/StatusService'

ipcMain.handle('put-status', async (_, id: number, _status: IStatus) => {
  await putStatus(id, _status)
})
