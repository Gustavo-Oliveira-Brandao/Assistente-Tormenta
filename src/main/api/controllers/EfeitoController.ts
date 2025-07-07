import { ipcMain } from 'electron'
import {
  deleteEfeito,
  getEfeitosPersonagem,
  postEfeito,
  putEfeito
} from '../services/EfeitoService'
import { Efeito } from '../entities/Efeito'
import { DeepPartial } from 'typeorm'

ipcMain.handle('post-efeito', async (_, _efeito: DeepPartial<Efeito>, _idPersonagem: number) => {
  await postEfeito(_efeito, _idPersonagem)
})

ipcMain.handle('put-efeito', async (_, _efeito: Efeito) => {
  await putEfeito(_efeito)
})

ipcMain.handle('delete-efeito', async (_, _id: number) => {
  await deleteEfeito(_id)
})

ipcMain.handle('get-efeitos-personagem', async (_, _idPersonagem: number) => {
  return await getEfeitosPersonagem(_idPersonagem)
})
