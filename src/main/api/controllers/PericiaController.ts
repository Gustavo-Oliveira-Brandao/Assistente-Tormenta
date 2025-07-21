import { ipcMain } from 'electron'
import { Pericia } from '../entities/Pericia'
import { putPericia } from '../services/PericiaService'

ipcMain.handle('put-pericia', async (_, _pericia: Pericia) => {
  await putPericia(_pericia)
})
