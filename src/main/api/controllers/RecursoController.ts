import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Recurso } from '../entities/Recurso'
import { putRecurso } from '../services/RecursoService'

ipcMain.handle('put-recurso', async (event: IpcMainInvokeEvent, _recurso: Recurso) => {
  console.log(`FrameID:${event.frameId}`)
  await putRecurso(_recurso)
})
