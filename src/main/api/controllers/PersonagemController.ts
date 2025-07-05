import { ipcMain } from 'electron'
import {
  deletePersonagem,
  getPersonagem,
  getTodosPersonagem,
  postPersonagem,
  putPersonagem
} from '../services/PersonagemService'
import { Personagem } from '../entities/Personagem'
import { DeepPartial } from 'typeorm'

ipcMain.handle('get-personagens', async () => {
  return await getTodosPersonagem()
})

ipcMain.handle('get-personagem', async (_, _id: number) => {
  return await getPersonagem(_id)
})

ipcMain.handle('post-personagem', async (_, _personagem: DeepPartial<Personagem>) => {
  await postPersonagem(_personagem)
})

ipcMain.handle('put-personagem', async (_, _personagem: Personagem) => {
  await putPersonagem(_personagem)
})

ipcMain.handle('delete-personagem', async (_, _id: number) => {
  await deletePersonagem(_id)
})
