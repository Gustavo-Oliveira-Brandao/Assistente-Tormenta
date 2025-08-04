import { ipcMain } from 'electron'
import { putPericia } from '../../Tormenta20.Application/Services/PericiaService'
import { IPericia } from '../../Tormenta20.Domain/@types/IPericia'

ipcMain.handle('put-pericia', async (_, id: number, _pericia: IPericia) => {
  await putPericia(id, _pericia)
})
