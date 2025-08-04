import { ipcMain } from 'electron'
import { Atributo } from '@prisma/client'
import { putAtributo } from '../../Tormenta20.Application/Services/AtributoService'

ipcMain.handle('put-atributo', async (_, id: number, _atributo: Atributo) => {
  await putAtributo(id, _atributo)
})
