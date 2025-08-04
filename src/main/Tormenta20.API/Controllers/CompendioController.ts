import { ipcMain } from 'electron'
import { getCompendioGeral } from '../../Tormenta20.Application/Services/CompendioService'

ipcMain.handle('get-compendio-t20', async () => {
  return await getCompendioGeral()
})
