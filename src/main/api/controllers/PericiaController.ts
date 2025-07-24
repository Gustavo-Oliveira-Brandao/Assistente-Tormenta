import { ipcMain } from 'electron'
import { putPericia } from '../services/PericiaService'
import { IPericia } from '../../@types/T20 GOTY/IPericia'

ipcMain.handle('put-pericia', async (_, id: number, _pericia: IPericia) => {
  await putPericia(id, _pericia)
})
