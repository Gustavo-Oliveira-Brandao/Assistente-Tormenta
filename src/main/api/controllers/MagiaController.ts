import { ipcMain } from 'electron'
import { DeepPartial } from 'typeorm'
import { Magia } from '../entities/Magia'
import {
  deleteMagia,
  getMagiasDefault,
  getMagiasPersonagem,
  postMagia,
  putMagia
} from '../services/MagiaService'

ipcMain.handle('get-magias-default', async () => {
  const magias = await getMagiasDefault()
  return magias
})

ipcMain.handle('get-magias-personagem', async (_, _idPersonagem) => {
  return await getMagiasPersonagem(_idPersonagem)
})

ipcMain.handle('post-magia', async (_, _magia: DeepPartial<Magia>, _idPersonagem: number) => {
  await postMagia(_magia, _idPersonagem)
})

ipcMain.handle('put-magia', async (_, _magia: Magia) => {
  await putMagia(_magia)
})

ipcMain.handle('delete-magia', async (_, _id: number) => {
  await deleteMagia(_id)
})
