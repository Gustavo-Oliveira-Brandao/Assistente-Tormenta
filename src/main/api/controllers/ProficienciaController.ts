import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deleteProficiencia,
  getProficienciasPorPersonagem,
  postProficiencia,
  putProficiencia
} from '../services/ProficienciaService'
import { Proficiencia } from '../entities/Proficiencia'
import { DeepPartial } from 'typeorm'

ipcMain.handle(
  'get-proficiencias-personagem',
  async (event: IpcMainInvokeEvent, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    return await getProficienciasPorPersonagem(_idPersonagem)
  }
)

ipcMain.handle(
  'post-proficiencia',
  async (
    event: IpcMainInvokeEvent,
    _proficiencia: DeepPartial<Proficiencia>,
    _idPersonagem: number
  ) => {
    console.log(`FrameID:${event.frameId}`)
    return await postProficiencia(_proficiencia, _idPersonagem)
  }
)

ipcMain.handle(
  'put-proficiencia',
  async (event: IpcMainInvokeEvent, _proficiencia: Proficiencia) => {
    console.log(`FrameID:${event.frameId}`)
    await putProficiencia(_proficiencia)
  }
)

ipcMain.handle('delete-proficiencia', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deleteProficiencia(_id)
})
