import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { getClassesDefault } from '../services/ClasseService'

ipcMain.handle('get-classes-default', async (event: IpcMainInvokeEvent) => {
  console.log(`FrameID:${event.frameId}`)
  return await getClassesDefault()
})
