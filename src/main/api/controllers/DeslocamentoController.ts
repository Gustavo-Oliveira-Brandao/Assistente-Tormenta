import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IDeslocamento } from '../@types/t20/Deslocamento'
import { putDeslocamento } from '../services/DeslocamentoService'

ipcMain.handle(
  'put-deslocamento',
  async (event: IpcMainInvokeEvent, deslocamento: IDeslocamento) => {
    event.defaultPrevented
    await putDeslocamento(deslocamento)
  }
)
