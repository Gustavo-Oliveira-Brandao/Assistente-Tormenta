import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IRecurso } from '../@types/t20/Recurso'
import { putRecurso } from '../services/RecursoService'

ipcMain.handle('put-recurso', async (event: IpcMainInvokeEvent, recurso: IRecurso) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  await putRecurso(recurso)
})
