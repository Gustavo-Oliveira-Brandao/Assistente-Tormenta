import { ipcMain } from 'electron'
import { Deslocamento } from '../entities/Deslocamento'
import { getDeslocamentoPersonagem, putDeslocamento } from '../services/DeslocamentoService'

ipcMain.handle('put-deslocamento', async (_, _deslocamento: Deslocamento) => {
  await putDeslocamento(_deslocamento)
})
ipcMain.handle('get-deslocamento-personagem', async (_, _idPersonagem: number) => {
  return await getDeslocamentoPersonagem(_idPersonagem)
})
