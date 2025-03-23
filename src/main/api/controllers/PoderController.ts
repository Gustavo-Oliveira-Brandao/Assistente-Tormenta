import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IPoder } from '../@types/t20/Poder'
import { postPoder, deletePoder } from '../services/PoderService'

ipcMain.handle(
  'post-poder',
  async (event: IpcMainInvokeEvent, _poder: IPoder, idPersonagem: number) => {
    event.defaultPrevented
    await postPoder(_poder, idPersonagem)
  }
)

ipcMain.handle('delete-poder', async (event: IpcMainInvokeEvent, id: number) => {
  event.defaultPrevented
  await deletePoder(id)
})
