import { ipcMain } from 'electron'
import { getClassesDefault } from '../services/ClasseService'

ipcMain.handle('get-classes-default', async () => {
  return await getClassesDefault()
})
