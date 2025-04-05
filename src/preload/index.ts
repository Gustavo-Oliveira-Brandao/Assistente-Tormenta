import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IPoder } from '../main/api/@types/t20/Poder'
import { IAtributo } from '../main/api/@types/t20/Atributo'
import { IRecurso } from '../main/api/@types/t20/Recurso'
import { IPericia } from '../main/api/@types/t20/Pericia'
import { ICriatura } from '../main/api/@types/t20/Criatura'
import { DeepPartial } from 'typeorm'
import { IMagia } from '../main/api/@types/t20/Magia'

// Custom APIs for renderer
const api = {
  getTodosPersonagens: (): Promise<ICriatura[]> => ipcRenderer.invoke('get-todos-personagens'),
  getPersonagem: (id: number): Promise<ICriatura> => ipcRenderer.invoke('get-personagem', id),
  postPersonagem: (personagem: DeepPartial<ICriatura>): Promise<ICriatura> =>
    ipcRenderer.invoke('post-personagem', personagem),
  putPersonagem: (personagem: ICriatura): Promise<ICriatura> =>
    ipcRenderer.invoke('put-personagem', personagem),
  deletePersonagem: (id: number): Promise<void> => ipcRenderer.invoke('delete-personagem', id),
  postPoder: (_poder: IPoder, idPersonagem: number): Promise<IPoder> =>
    ipcRenderer.invoke('post-poder', _poder, idPersonagem),
  deletePoder: (id: number): Promise<void> => ipcRenderer.invoke('delete-poder', id),
  putAtributo: (atributo: IAtributo): Promise<IAtributo> =>
    ipcRenderer.invoke('put-atributo', atributo),
  putRecurso: (recurso: IRecurso): Promise<IRecurso> => ipcRenderer.invoke('put-recurso', recurso),
  putPericia: (pericia: IPericia): Promise<IPericia> => ipcRenderer.invoke('put-pericia', pericia),
  postMagia: (_magia: IMagia, idPersonagem: number): Promise<IMagia> =>
    ipcRenderer.invoke('post-magia', _magia, idPersonagem),
  deleteMagia: (id: number): Promise<void> => ipcRenderer.invoke('delete-magia', id)
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
