import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IRecurso } from '../@types/t20/Recurso'
import { putVida, putMana } from '../services/RecursoService'

ipcMain.handle('put-vida', async (event: IpcMainInvokeEvent, vida: IRecurso) => {
  event.defaultPrevented
  await putVida(vida)
})

ipcMain.handle('put-mana', async (event: IpcMainInvokeEvent, mana: IRecurso) => {
  event.defaultPrevented
  await putMana(mana)
})
