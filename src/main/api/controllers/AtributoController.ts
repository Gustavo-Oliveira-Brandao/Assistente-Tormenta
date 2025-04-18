import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IAtributo } from '../@types/t20/Atributo'
import { putAtributo } from '../services/AtributoService'

ipcMain.handle('put-atributo', async (event: IpcMainInvokeEvent, atributo: IAtributo) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  await putAtributo(atributo)
})
