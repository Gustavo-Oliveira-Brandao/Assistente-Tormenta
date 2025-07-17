import { ipcMain } from 'electron'
import { deletePoder, getPoderesPersonagem, postPoder } from '../services/PoderService'
import { DeepPartial } from 'typeorm'
import { Poder } from '../entities/Poder'

ipcMain.handle('get-poderes-personagem', async (_, _idPersonagem: number) => {
  const poderes = await getPoderesPersonagem(_idPersonagem)
  return poderes
})

ipcMain.handle(
  'post-poder',
  async (_, _poder: DeepPartial<Poder>, nivelPoder: number, _idPersonagem: number) => {
    await postPoder(_poder, nivelPoder, _idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (_, _id: number) => {
  await deletePoder(_id)
})
