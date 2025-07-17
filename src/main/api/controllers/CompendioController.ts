import { ipcMain } from 'electron'
import { getCompendioGeral } from '../services/compendioService'

ipcMain.handle('get-compendio-t20', async () => {
  return await getCompendioGeral()
})
