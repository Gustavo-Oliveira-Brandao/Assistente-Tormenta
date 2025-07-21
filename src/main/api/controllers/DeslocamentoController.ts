import { ipcMain } from 'electron'
import { Deslocamento } from '../entities/Deslocamento'
import { putDeslocamento } from '../services/DeslocamentoService'

ipcMain.handle('put-deslocamento', async (_, _deslocamento: Deslocamento) => {
  await putDeslocamento(_deslocamento)
})
