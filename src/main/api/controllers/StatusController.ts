import { ipcMain } from 'electron'
import { putRecurso } from '../services/StatusService'
import { Status } from '../entities/Status'

ipcMain.handle('put-status', async (_, _status: Status) => {
  await putRecurso(_status)
})
