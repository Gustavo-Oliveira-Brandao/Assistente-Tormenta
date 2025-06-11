import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Personagem } from '../main/api/entities/Personagem'
import { Atributo } from '../main/api/entities/Atributo'
import { Deslocamento } from '../main/api/entities/Deslocamento'
import { Grimorio } from '../main/api/entities/Grimorio'
import { Magia } from '../main/api/entities/Magia'
import { Pericia } from '../main/api/entities/Pericia'
import { Poder } from '../main/api/entities/Poder'
import { Proficiencia } from '../main/api/entities/Proficiencia'
import { Recurso } from '../main/api/entities/Recurso'
import { IRaca } from '../main/@types/IRaca'
import { DeepPartial } from 'typeorm'
import { IClasse } from '../main/@types/IClasse'
import { Nivel } from '../main/api/entities/Nivel'

// Custom APIs for renderer
const api = {
  personagem: {
    getTodosPersonagem: (): Promise<Personagem[]> => ipcRenderer.invoke('get-personagens'),
    getPersonagem: (_id: number): Promise<Personagem> => ipcRenderer.invoke('get-personagem', _id),
    postPersonagem: (_personagem: DeepPartial<Personagem>): Promise<void> =>
      ipcRenderer.invoke('post-personagem', _personagem),
    putPersonagem: (_personagem: Personagem): Promise<void> =>
      ipcRenderer.invoke('put-personagem', _personagem),
    getProgressaoPersonagem: (_idPersonagem: number): Promise<Nivel[]> =>
      ipcRenderer.invoke('get-progressao-personagem', _idPersonagem),
    deletePersonagem: (_id: number): Promise<void> => ipcRenderer.invoke('delete-personagem', _id)
  },

  atributo: {
    putAtributo: (_atributo: Atributo): Promise<void> =>
      ipcRenderer.invoke('put-atributo', _atributo)
  },

  classe: {
    getClassesDefault: (): Promise<IClasse[]> => ipcRenderer.invoke('get-classes-default')
  },
  racas: {
    getRacasDefault: (): Promise<IRaca[]> => ipcRenderer.invoke('get-racas-default')
  },
  deslocamento: {
    putDeslocamento: (_deslocamento: Deslocamento): Promise<void> =>
      ipcRenderer.invoke('put-deslocamento', _deslocamento)
  },

  magia: {
    getMagiasDefault: (): Promise<DeepPartial<Magia[]>> => ipcRenderer.invoke('get-magias-default'),
    getGrimoriosPorPersonagem: (_idPersonagem: number): Promise<Grimorio[]> =>
      ipcRenderer.invoke('get-grimorios-personagem', _idPersonagem),
    postGrimorio: (_grimorio: DeepPartial<Grimorio>, _idPersonagem: number): Promise<void> =>
      ipcRenderer.invoke('post-grimorio', _grimorio, _idPersonagem),
    putGrimorio: (_grimorio: Grimorio): Promise<void> =>
      ipcRenderer.invoke('put-grimorio', _grimorio),
    deleteGrimorio: (_id: number): Promise<void> => ipcRenderer.invoke('delete-grimorio', _id),
    postMagia: (_magia: DeepPartial<Magia>, _idGrimorio: number): Promise<void> =>
      ipcRenderer.invoke('post-magia', _magia, _idGrimorio),
    deleteMagia: (_id: number): Promise<void> => ipcRenderer.invoke('delete-magia', _id)
  },

  poder: {
    getPoderesDefault: (): Promise<DeepPartial<Poder[]>> =>
      ipcRenderer.invoke('get-poderes-default'),
    getPoderesPorPersonagem: (_idNivel: number): Promise<Poder[]> =>
      ipcRenderer.invoke('get-poderes-nivel-personagem', _idNivel),
    postPoder: (_poder: DeepPartial<Poder>, _idNivel: number): Promise<void> =>
      ipcRenderer.invoke('post-poder', _poder, _idNivel),
    deletePoder: (_id: number): Promise<void> => ipcRenderer.invoke('delete-poder', _id)
  },

  proficiencia: {
    getProficienciasPorPersonagem: (_idPersonagem: number): Promise<Proficiencia[]> =>
      ipcRenderer.invoke('get-proficiencias-personagem', _idPersonagem),
    postProficiencia: (
      _proficiencia: DeepPartial<Proficiencia>,
      _idPersonagem: number
    ): Promise<void> => ipcRenderer.invoke('post-proficiencia', _proficiencia, _idPersonagem),
    putProficiencia: (_proficiencia: Proficiencia): Promise<void> =>
      ipcRenderer.invoke('put-proficiencia', _proficiencia),
    deleteProficiencia: (_id: number): Promise<void> =>
      ipcRenderer.invoke('delete-proficiencia', _id)
  },

  pericia: {
    putPericia: (_pericia: Pericia): Promise<void> => ipcRenderer.invoke('put-pericia', _pericia)
  },

  recurso: {
    putRecurso: (_recurso: Recurso): Promise<void> => ipcRenderer.invoke('put-recurso', _recurso)
  }
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
