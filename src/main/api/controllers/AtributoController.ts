import { ipcMain } from 'electron'
import { Atributo } from '../entities/Atributo'
import { getAtributosPersonagem, putAtributo } from '../services/AtributoService'

ipcMain.handle('put-atributo', async (_, _atributo: Atributo) => {
  await putAtributo(_atributo)
})

ipcMain.handle('get-atributos-personagem', async (_, _idPersonagem: number) => {
  return await getAtributosPersonagem(_idPersonagem)
})
