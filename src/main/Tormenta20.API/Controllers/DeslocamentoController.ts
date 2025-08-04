import { ipcMain } from 'electron'
import { Deslocamento } from '@prisma/client'
import { putDeslocamento } from '../../Tormenta20.Application/Services/DeslocamentoService'

ipcMain.handle('put-deslocamento', async (_, id: number, _deslocamento: Deslocamento) => {
  await putDeslocamento(id, _deslocamento)
})
