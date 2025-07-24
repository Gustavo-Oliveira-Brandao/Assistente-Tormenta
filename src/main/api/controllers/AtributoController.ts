import { ipcMain } from 'electron'
import { putAtributo } from '../services/AtributoService'
import { Atributo } from '@prisma/client'

ipcMain.handle('put-atributo', async (_, id: number, _atributo: Atributo) => {
  await putAtributo(id, _atributo)
})
