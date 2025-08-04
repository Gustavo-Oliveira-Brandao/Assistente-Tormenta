import { ipcMain } from 'electron'

import { Proficiencia } from '@prisma/client'
import {
  deleteProficiencia,
  postProficiencia,
  putProficiencia
} from '../../Tormenta20.Application/Services/ProficienciaService'
import { IProficienciaPostRequestDTO } from '../../Tormenta20.Application/DTOs/IProficiencia'

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
