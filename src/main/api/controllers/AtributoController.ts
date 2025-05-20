import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Atributo } from '../entities/Atributo'
import { putAtributo } from '../services/AtributoService'

ipcMain.handle('put-atributo', async (event: IpcMainInvokeEvent, _atributo: Atributo) => {
  console.log(`FrameID:${event.frameId}`)
  await putAtributo(_atributo)
})
