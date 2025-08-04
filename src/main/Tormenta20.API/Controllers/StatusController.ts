import { ipcMain } from 'electron'
import { putStatus } from '../../Tormenta20.Application/Services/StatusService'
import { IStatus } from '../../Tormenta20.Domain/@types/IStatus'

ipcMain.handle('put-status', async (_, id: number, _status: IStatus) => {
  await putStatus(id, _status)
})
