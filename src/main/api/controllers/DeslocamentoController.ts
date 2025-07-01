import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Deslocamento } from '../entities/Deslocamento'
import { getDeslocamentoPersonagem, putDeslocamento } from '../services/DeslocamentoService'

ipcMain.handle(
  'put-deslocamento',
  async (event: IpcMainInvokeEvent, _deslocamento: Deslocamento) => {
    console.log(`FrameID:${event.frameId}`)
    await putDeslocamento(_deslocamento)
  }
)
ipcMain.handle(
  'get-deslocamento-personagem',
  async (event: IpcMainInvokeEvent, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    return await getDeslocamentoPersonagem(_idPersonagem)
  }
)
