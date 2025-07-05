import { ipcMain } from 'electron'
import { Pericia } from '../entities/Pericia'
import { getPericiasPersonagem, putPericia } from '../services/PericiaService'

ipcMain.handle('put-pericia', async (_, _pericia: Pericia) => {
  await putPericia(_pericia)
})
ipcMain.handle('get-pericias-personagem', async (_, _idPersonagem: number) => {
  return await getPericiasPersonagem(_idPersonagem)
})
