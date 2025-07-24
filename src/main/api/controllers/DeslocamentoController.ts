import { ipcMain } from 'electron'
import { putDeslocamento } from '../services/DeslocamentoService'
import { Deslocamento } from '@prisma/client'

ipcMain.handle('put-deslocamento', async (_, id: number, _deslocamento: Deslocamento) => {
  await putDeslocamento(id, _deslocamento)
})
