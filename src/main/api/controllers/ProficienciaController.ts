import { ipcMain } from 'electron'
import {
  deleteProficiencia,
  getProficienciasPorPersonagem,
  postProficiencia,
  putProficiencia
} from '../services/ProficienciaService'
import { Proficiencia } from '../entities/Proficiencia'
import { DeepPartial } from 'typeorm'

ipcMain.handle('get-proficiencias-personagem', async (_, _idPersonagem: number) => {
  return await getProficienciasPorPersonagem(_idPersonagem)
})

ipcMain.handle(
  'post-proficiencia',
  async (_, _proficiencia: DeepPartial<Proficiencia>, _idPersonagem: number) => {
    return await postProficiencia(_proficiencia, _idPersonagem)
  }
)

ipcMain.handle('put-proficiencia', async (_, _proficiencia: Proficiencia) => {
  await putProficiencia(_proficiencia)
})

ipcMain.handle('delete-proficiencia', async (_, _id: number) => {
  await deleteProficiencia(_id)
})
