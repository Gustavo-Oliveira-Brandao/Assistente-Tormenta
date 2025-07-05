import { ipcMain } from 'electron'
import {
  deleteGrimorio,
  deleteMagia,
  getGrimoriosPorPersonagem,
  getMagiasDefault,
  postGrimorio,
  postMagia,
  putGrimorio
} from '../services/MagiaService'
import { Grimorio } from '../entities/Grimorio'
import { DeepPartial } from 'typeorm'
import { Magia } from '../entities/Magia'

ipcMain.handle('get-magias-default', async () => {
  const magias = await getMagiasDefault()
  return magias
})

ipcMain.handle('get-grimorios-personagem', async (_, _idPersonagem) => {
  return await getGrimoriosPorPersonagem(_idPersonagem)
})

ipcMain.handle(
  'post-grimorio',
  async (_, _grimorio: DeepPartial<Grimorio>, _idPersonagem: number) => {
    await postGrimorio(_grimorio, _idPersonagem)
  }
)

ipcMain.handle('put-grimorio', async (_, _grimorio: Grimorio) => {
  await putGrimorio(_grimorio)
})

ipcMain.handle('delete-grimorio', async (_, _id: number) => {
  await deleteGrimorio(_id)
})

ipcMain.handle('post-magia', async (_, _magia: DeepPartial<Magia>, _idGrimorio: number) => {
  await postMagia(_magia, _idGrimorio)
})

ipcMain.handle('delete-magia', async (_, _id: number) => {
  await deleteMagia(_id)
})
