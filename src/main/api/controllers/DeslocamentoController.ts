import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IDeslocamento } from '../@types/t20/Deslocamento'
import { putDeslocamento } from '../services/DeslocamentoService'

ipcMain.handle(
  'put-deslocamento',
  async (event: IpcMainInvokeEvent, deslocamento: IDeslocamento) => {
    console.log(`Evento recebido com frameID: ${event.frameId}`)
    await putDeslocamento(deslocamento)
  }
)
