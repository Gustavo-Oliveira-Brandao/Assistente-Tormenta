import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { getStatusPersonagem, putRecurso } from '../services/StatusService'
import { Status } from '../entities/Status'

ipcMain.handle('put-recurso', async (event: IpcMainInvokeEvent, _status: Status) => {
  console.log(`FrameID:${event.frameId}`)
  await putRecurso(_status)
})
ipcMain.handle(
  'get-status-personagem',
  async (event: IpcMainInvokeEvent, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    return await getStatusPersonagem(_idPersonagem)
  }
)
