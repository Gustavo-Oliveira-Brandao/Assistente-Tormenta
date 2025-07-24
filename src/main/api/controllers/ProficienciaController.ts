import { ipcMain } from 'electron'
import {
  deleteProficiencia,
  postProficiencia,
  putProficiencia
} from '../services/ProficienciaService'
import { IProficienciaPostRequestDTO } from '../../@types/T20 GOTY/IProficiencia'
import { Proficiencia } from '@prisma/client'

ipcMain.handle(
  'post-proficiencia',
  async (_, _proficiencia: IProficienciaPostRequestDTO, _idPersonagem: number) => {
    return await postProficiencia(_proficiencia, _idPersonagem)
  }
)

ipcMain.handle('put-proficiencia', async (_, id: number, _proficiencia: Proficiencia) => {
  await putProficiencia(id, _proficiencia)
})

ipcMain.handle('delete-proficiencia', async (_, _id: number) => {
  await deleteProficiencia(_id)
})
