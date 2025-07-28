import { ipcMain } from 'electron'
import { deletePoder, getPoderesPersonagem, postPoder } from '../services/PoderService'
import { IPoderPostRequestDTO } from '../../@types/T20 GOTY/IPoder'

ipcMain.handle('get-poderes-personagem', async (_, _idPersonagem: number) => {
  const poderes = await getPoderesPersonagem(_idPersonagem)
  return poderes
})

ipcMain.handle('post-poder', async (_, _poder: IPoderPostRequestDTO, nivel: number, _idPersonagem: number) => {
  await postPoder(_poder, nivel, _idPersonagem)
})

ipcMain.handle('delete-poder', async (_, _id: number) => {
  await deletePoder(_id)
})
