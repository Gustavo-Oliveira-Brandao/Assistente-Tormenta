import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deletePersonagem,
  deletePoder,
  getPersonagem,
  getTodosPersonagens,
  postPersonagem,
  postPoder,
  putAtributo,
  putDefesa,
  putDeslocamento,
  putMana,
  putPersonagem,
  putVida
} from '../services/PersonagemService'
import { IPersonagem } from '../@types/t20/Personagem'
import { IPoder } from '../@types/t20/Poder'
import { IAtributo } from '../@types/t20/Atributo'
import { IRecurso } from '../@types/t20/Recurso'
import { IDefesa } from '../@types/t20/Defesa'
import { IDeslocamento } from '../@types/t20/Deslocamento'

ipcMain.handle('get-todos-personagens', async (event: IpcMainInvokeEvent) => {
  event.defaultPrevented
  return await getTodosPersonagens()
})

ipcMain.handle('get-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  event.defaultPrevented
  return await getPersonagem(id)
})

ipcMain.handle('post-personagem', async (event: IpcMainInvokeEvent, _personagem: IPersonagem) => {
  event.defaultPrevented
  return await postPersonagem(_personagem)
})

ipcMain.handle('put-personagem', async (event: IpcMainInvokeEvent, _personagem: IPersonagem) => {
  event.defaultPrevented
  return await putPersonagem(_personagem)
})

ipcMain.handle('delete-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  event.defaultPrevented
  await deletePersonagem(id)
})

ipcMain.handle(
  'post-poder',
  async (event: IpcMainInvokeEvent, _poder: IPoder, idPersonagem: number) => {
    event.defaultPrevented
    await postPoder(_poder, idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, id: number) => {
  event.defaultPrevented
  await deletePoder(id)
})

ipcMain.handle('put-atributo', async (event: IpcMainInvokeEvent, atributo: IAtributo) => {
  event.defaultPrevented
  await putAtributo(atributo)
})

ipcMain.handle('put-vida', async (event: IpcMainInvokeEvent, vida: IRecurso) => {
  event.defaultPrevented
  await putVida(vida)
})

ipcMain.handle('put-mana', async (event: IpcMainInvokeEvent, mana: IRecurso) => {
  event.defaultPrevented
  await putMana(mana)
})

ipcMain.handle('put-defesa', async (event: IpcMainInvokeEvent, defesa: IDefesa) => {
  event.defaultPrevented
  await putDefesa(defesa)
})

ipcMain.handle(
  'put-deslocamento',
  async (event: IpcMainInvokeEvent, deslocamento: IDeslocamento) => {
    event.defaultPrevented
    await putDeslocamento(deslocamento)
  }
)
