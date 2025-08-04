import { ipcMain } from 'electron'
import {
  deleteEfeito,
  postEfeito,
  putEfeito
} from '../../Tormenta20.Application/Services/EfeitoService'
import { IEfeitoPostRequestDTO } from '../../Tormenta20.Application/DTOs/IEfeito'
import { IEfeito } from '../../Tormenta20.Domain/@types/IEfeito'

ipcMain.handle('post-efeito', async (_, _efeito: IEfeitoPostRequestDTO, _idPersonagem: number) => {
  await postEfeito(_efeito, _idPersonagem)
})

ipcMain.handle('put-efeito', async (_, id: number, _efeito: IEfeito) => {
  await putEfeito(id, _efeito)
})

ipcMain.handle('delete-efeito', async (_, _id: number) => {
  await deleteEfeito(_id)
})
