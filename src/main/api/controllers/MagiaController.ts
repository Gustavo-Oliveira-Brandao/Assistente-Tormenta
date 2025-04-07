import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IMagia } from '../@types/t20/Magia'
import { deleteMagia, getMagiasPorPersonagem, postMagia } from '../services/MagiaService'

ipcMain.handle(
  'get-magias-personagem',
  async (event: IpcMainInvokeEvent, _idPersonagem: number) => {
    console.log(`Evento recebido com frameID: ${event.frameId}`)
    return await getMagiasPorPersonagem(_idPersonagem)
  }
)

ipcMain.handle(
  'post-magia',
  async (event: IpcMainInvokeEvent, _magia: IMagia, idPersonagem: number) => {
    console.log(`Evento recebido com frameID: ${event.frameId}`)
    await postMagia(_magia, idPersonagem)
  }
)

ipcMain.handle('delete-magia', async (event: IpcMainInvokeEvent, id: number) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  await deleteMagia(id)
})
