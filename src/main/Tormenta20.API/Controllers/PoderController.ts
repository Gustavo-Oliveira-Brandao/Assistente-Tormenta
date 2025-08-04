import { ipcMain } from 'electron'
import {
  deletePoder,
  getPoderesPersonagem,
  postPoder
} from '../../Tormenta20.Application/Services/PoderService'
import { IPoderPostRequestDTO } from '../../Tormenta20.Application/DTOs/IPoder'

ipcMain.handle('get-poderes-personagem', async (_, _idPersonagem: number) => {
  const poderes = await getPoderesPersonagem(_idPersonagem)
  return poderes
})

ipcMain.handle(
  'post-poder',
  async (_, _poder: IPoderPostRequestDTO, nivel: number, _idPersonagem: number) => {
    await postPoder(_poder, nivel, _idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (_, _id: number) => {
  await deletePoder(_id)
})
