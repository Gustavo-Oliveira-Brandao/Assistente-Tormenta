import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Personagem } from '../main/api/entity/personagem'
import { IPersonagemT20 } from '../main/api/@types/t20/Personagem'

// Custom APIs for renderer
const api = {
  getPersonagem: (id: number): Promise<IPersonagemT20> => ipcRenderer.invoke('get-personagem', id),
  postPersonagem: (personagem: Partial<Personagem>): Promise<IPersonagemT20> =>
    ipcRenderer.invoke('post-personagem', personagem)
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
