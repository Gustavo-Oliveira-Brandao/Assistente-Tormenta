import { ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  deleteGrimorio,
  deleteMagia,
  getGrimoriosPorPersonagem,
  postGrimorio,
  postMagia,
  putGrimorio
} from '../services/MagiaService'
import { Grimorio } from '../entities/Grimorio'
import { Magia } from '../entities/Magia'

ipcMain.handle('get-grimorios-personagem', async (event: IpcMainInvokeEvent, _idPersonagem) => {
  console.log(`FrameID:${event.frameId}`)
  return await getGrimoriosPorPersonagem(_idPersonagem)
})

ipcMain.handle(
  'post-grimorio',
  async (event: IpcMainInvokeEvent, _grimorio: Partial<Grimorio>, _idPersonagem: number) => {
    console.log(`FrameID:${event.frameId}`)
    await postGrimorio(_grimorio, _idPersonagem)
  }
)

ipcMain.handle('put-grimorio', async (event: IpcMainInvokeEvent, _grimorio: Grimorio) => {
  console.log(`FrameID:${event.frameId}`)
  await putGrimorio(_grimorio)
})

ipcMain.handle('delete-grimorio', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deleteGrimorio(_id)
})

ipcMain.handle(
  'post-magia',
  async (event: IpcMainInvokeEvent, _magia: Partial<Magia>, _idGrimorio: number) => {
    console.log(`FrameID:${event.frameId}`)
    await postMagia(_magia, _idGrimorio)
  }
)

ipcMain.handle('delete-magia', async (event: IpcMainInvokeEvent, _id: number) => {
  console.log(`FrameID:${event.frameId}`)
  await deleteMagia(_id)
})
