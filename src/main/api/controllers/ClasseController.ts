import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Classe } from '../entities/Classe'
import { deleteClasse, postClasse, putClasse } from '../services/ClasseService'
import { DeepPartial } from 'typeorm'

ipcMain.handle(
  'post-classe',
  async (event: IpcMainInvokeEvent, _classe: DeepPartial<Classe>, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    await postClasse(_classe, _idPersonagem)
  }
)

ipcMain.handle('put-classe', async (event: IpcMainInvokeEvent, _classe: Classe) => {
  console.log(`FrameID:${event.frameId}`)
  await putClasse(_classe)
})

ipcMain.handle('delete-classe', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deleteClasse(_id)
})
