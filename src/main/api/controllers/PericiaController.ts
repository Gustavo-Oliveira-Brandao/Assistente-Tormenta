import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Pericia } from '../entities/Pericia'
import { getPericiasPersonagem, putPericia } from '../services/PericiaService'

ipcMain.handle('put-pericia', async (event: IpcMainInvokeEvent, _pericia: Pericia) => {
  console.log(`FrameID:${event.frameId}`)
  await putPericia(_pericia)
})
ipcMain.handle(
  'get-pericias-personagem',
  async (event: IpcMainInvokeEvent, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    return await getPericiasPersonagem(_idPersonagem)
  }
)
