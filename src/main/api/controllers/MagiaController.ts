import { ipcMain } from 'electron'
import { DeepPartial } from 'typeorm'
import { Grimorio, Magia } from '../entities/Magia'
import {
  deleteMagia,
  getGrimorioPersonagem,
  postMagia,
  putGrimorio,
  putMagia
} from '../services/MagiaService'

ipcMain.handle('put-grimorio', async (_, _grimorio: Grimorio) => {
  await putGrimorio(_grimorio)
})

ipcMain.handle('get-grimorio-personagem', async (_, _idPersonagem: number) => {
  return await getGrimorioPersonagem(_idPersonagem)
})

ipcMain.handle('post-magia', async (_, _magia: DeepPartial<Magia>, _idGrimorio: number) => {
  await postMagia(_magia, _idGrimorio)
})

ipcMain.handle('put-magia', async (_, _magia: Magia) => {
  await putMagia(_magia)
})

ipcMain.handle('delete-magia', async (_, _id: number) => {
  await deleteMagia(_id)
})
