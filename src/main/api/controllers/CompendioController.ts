import { ipcMain } from 'electron'
import { getCompendioGeral } from '../services/CompendioService'

ipcMain.handle('get-compendio-t20', async () => {
  return await getCompendioGeral()
})
