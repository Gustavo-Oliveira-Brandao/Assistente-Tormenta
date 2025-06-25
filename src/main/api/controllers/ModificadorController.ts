import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Modificador } from '../entities/Modificador'
import { deleteModificador, postModificador, putModificador } from '../services/ModificadorService'

ipcMain.handle(
  'post-modificador',
  async (event: IpcMainInvokeEvent, _modificador: Partial<Modificador>, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    await postModificador(_modificador, _idPersonagem)
  }
)

ipcMain.handle('put-modificador', async (event: IpcMainInvokeEvent, _modificador: Modificador) => {
  console.log(`FrameID:${event.frameId}`)
  await putModificador(_modificador)
})

ipcMain.handle('delete-modificador', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deleteModificador(_id)
})
