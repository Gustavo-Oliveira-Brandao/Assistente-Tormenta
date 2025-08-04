import { ipcMain } from 'electron'
import { Personagem } from '@prisma/client'
import {
  deletePersonagem,
  getPersonagem,
  getTodosPersonagem,
  postPersonagem,
  putPersonagem
} from '../../Tormenta20.Application/Services/PersonagemService'

ipcMain.handle('get-personagens', async () => {
  return await getTodosPersonagem()
})

ipcMain.handle('get-personagem', async (_, _id: number) => {
  return await getPersonagem(_id)
})

ipcMain.handle('post-personagem', async (_, nomePersonagem: string) => {
  await postPersonagem(nomePersonagem)
})

ipcMain.handle('put-personagem', async (_, id: number, _personagem: Personagem) => {
  await putPersonagem(id, _personagem)
})

ipcMain.handle('delete-personagem', async (_, _id: number) => {
  await deletePersonagem(_id)
})
