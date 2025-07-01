import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Atributo } from '../entities/Atributo'
import { getAtributosPersonagem, putAtributo } from '../services/AtributoService'

ipcMain.handle('put-atributo', async (event: IpcMainInvokeEvent, _atributo: Atributo) => {
  console.log(`FrameID:${event.frameId}`)
  await putAtributo(_atributo)
})

ipcMain.handle(
  'get-atributos-personagem',
  async (event: IpcMainInvokeEvent, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    return await getAtributosPersonagem(_idPersonagem)
  }
)
