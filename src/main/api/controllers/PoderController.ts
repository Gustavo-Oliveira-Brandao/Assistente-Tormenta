import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IPoder } from '../@types/t20/Poder'
import { postPoder, deletePoder, getPoderesPorPersonagem } from '../services/PoderService'

ipcMain.handle(
  'get-poderes-personagem',
  async (event: IpcMainInvokeEvent, _idPersonagem: number) => {
    console.log(`Evento recebido com frameID: ${event.frameId}`)
    return await getPoderesPorPersonagem(_idPersonagem)
  }
)

ipcMain.handle(
  'post-poder',
  async (event: IpcMainInvokeEvent, _poder: IPoder, idPersonagem: number) => {
    console.log(`Evento recebido com frameID: ${event.frameId} date: ${Date.now()}`)
    await postPoder(_poder, idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, id: number) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  await deletePoder(id)
})
