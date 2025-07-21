import { ipcMain } from 'electron'
import { Atributo } from '../entities/Atributo'
import { putAtributo } from '../services/AtributoService'

ipcMain.handle('put-atributo', async (_, _atributo: Atributo) => {
  await putAtributo(_atributo)
})
