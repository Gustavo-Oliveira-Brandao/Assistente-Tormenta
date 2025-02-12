import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { getPersonagem, postPersonagem } from '../services/PersonagemService'
import { IPersonagemT20 } from '../@types/t20/Personagem'

ipcMain.handle('get-personagem', async (event: IpcMainInvokeEvent, id: number) => {
  return await getPersonagem(id)
})

ipcMain.handle(
  'post-personagem',
  async (event: IpcMainInvokeEvent, _personagem: IPersonagemT20) => {
    return await postPersonagem(_personagem)
  }
)
