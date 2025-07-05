import { ipcMain } from 'electron'
import { getRacasDefault } from '../services/RacaService'

ipcMain.handle('get-racas-default', async () => {
  const racas = await getRacasDefault()
  return racas
})
