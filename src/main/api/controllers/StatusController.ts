import { ipcMain } from 'electron'
import { getStatusPersonagem, putRecurso } from '../services/StatusService'
import { Status } from '../entities/Status'

ipcMain.handle('put-status', async (_, _status: Status) => {
  await putRecurso(_status)
})
ipcMain.handle('get-status-personagem', async (_, _idPersonagem: number) => {
  return await getStatusPersonagem(_idPersonagem)
})
