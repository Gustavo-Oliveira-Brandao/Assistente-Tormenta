import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IPoder } from '../@types/t20/Poder'
import { postPoder, deletePoder } from '../services/PoderService'

ipcMain.handle(
  'post-poder',
  async (event: IpcMainInvokeEvent, _poder: IPoder, idPersonagem: number) => {
    console.log(`Evento recebido com frameID: ${event.frameId}`)
    await postPoder(_poder, idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, id: number) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  await deletePoder(id)
})
