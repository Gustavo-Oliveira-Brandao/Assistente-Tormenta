import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IRecurso } from '../@types/t20/Recurso'
import { putVida, putMana } from '../services/RecursoService'

ipcMain.handle('put-vida', async (event: IpcMainInvokeEvent, vida: IRecurso) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  await putVida(vida)
})

ipcMain.handle('put-mana', async (event: IpcMainInvokeEvent, mana: IRecurso) => {
  console.log(`Evento recebido com frameID: ${event.frameId}`)
  await putMana(mana)
})
