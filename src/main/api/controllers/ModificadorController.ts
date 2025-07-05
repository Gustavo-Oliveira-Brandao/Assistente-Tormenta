import { ipcMain } from 'electron'
import { Modificador } from '../entities/Modificador'
import {
  deleteModificador,
  getModificadoresPersonagem,
  postModificador,
  putModificador
} from '../services/ModificadorService'

ipcMain.handle(
  'post-modificador',
  async (_, _modificador: Partial<Modificador>, _idPersonagem: number) => {
    await postModificador(_modificador, _idPersonagem)
  }
)

ipcMain.handle('put-modificador', async (_, _modificador: Modificador) => {
  await putModificador(_modificador)
})

ipcMain.handle('delete-modificador', async (_, _id: number) => {
  await deleteModificador(_id)
})

ipcMain.handle('get-modificadores-personagem', async (_, _idPersonagem: number) => {
  return await getModificadoresPersonagem(_idPersonagem)
})
