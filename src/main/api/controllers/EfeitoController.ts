import { ipcMain } from 'electron'
import { deleteEfeito, postEfeito, putEfeito } from '../services/EfeitoService'
import { IEfeito, IEfeitoPostRequestDTO } from '../../@types/T20 GOTY/IEfeito'

ipcMain.handle('post-efeito', async (_, _efeito: IEfeitoPostRequestDTO, _idPersonagem: number) => {
  await postEfeito(_efeito, _idPersonagem)
})

ipcMain.handle('put-efeito', async (_, id: number, _efeito: IEfeito) => {
  await putEfeito(id, _efeito)
})

ipcMain.handle('delete-efeito', async (_, _id: number) => {
  await deleteEfeito(_id)
})
