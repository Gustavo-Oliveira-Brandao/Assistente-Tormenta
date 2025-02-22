import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IPersonagem } from '../main/api/@types/t20/Personagem'
import { IPoder } from '../main/api/@types/t20/Poder'

// Custom APIs for renderer
const api = {
  getTodosPersonagens: (): Promise<IPersonagem[]> => ipcRenderer.invoke('get-todos-personagens'),
  getPersonagem: (id: number): Promise<IPersonagem> => ipcRenderer.invoke('get-personagem', id),
  postPersonagem: (personagem: Partial<IPersonagem>): Promise<IPersonagem> =>
    ipcRenderer.invoke('post-personagem', personagem),
  putPersonagem: (personagem: IPersonagem): Promise<IPersonagem> =>
    ipcRenderer.invoke('put-personagem', personagem),
  deletePersonagem: (id: number): Promise<void> => ipcRenderer.invoke('delete-personagem', id),
  postPoder: (_poder: IPoder, idPersonagem: number): Promise<IPoder> =>
    ipcRenderer.invoke('post-poder', _poder, idPersonagem),
  deletePoder: (id: number): Promise<void> => ipcRenderer.invoke('delete-poder', id)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
