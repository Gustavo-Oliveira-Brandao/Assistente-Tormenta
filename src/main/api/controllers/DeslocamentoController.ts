import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Deslocamento } from '../entities/Deslocamento'
import { putDeslocamento } from '../services/DeslocamentoService'

ipcMain.handle(
  'put-deslocamento',
  async (event: IpcMainInvokeEvent, _deslocamento: Deslocamento) => {
    console.log(`FrameID:${event.frameId}`)
    await putDeslocamento(_deslocamento)
  }
)
