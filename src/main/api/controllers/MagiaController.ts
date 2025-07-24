import { ipcMain } from 'electron'
import {
  deleteMagia,
  getGrimorioPersonagem,
  postMagia,
  putGrimorio,
  putMagia
} from '../services/MagiaService'
import { IGrimorio, IMagia, IMagiaPostRequestDTO } from '../../@types/T20 GOTY/IMagia'

ipcMain.handle('put-grimorio', async (_, id: number, _grimorio: IGrimorio) => {
  await putGrimorio(id, _grimorio)
})

ipcMain.handle('get-grimorio-personagem', async (_, _idPersonagem: number) => {
  return await getGrimorioPersonagem(_idPersonagem)
})

ipcMain.handle('post-magia', async (_, _magia: IMagiaPostRequestDTO, _idGrimorio: number) => {
  await postMagia(_magia, _idGrimorio)
})

ipcMain.handle('put-magia', async (_, id: number, _magia: IMagia) => {
  await putMagia(id, _magia)
})

ipcMain.handle('delete-magia', async (_, _id: number) => {
  await deleteMagia(_id)
})
