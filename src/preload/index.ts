import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Personagem } from '../main/api/entities/Personagem'
import { Atributo } from '../main/api/entities/Atributo'
import { Deslocamento } from '../main/api/entities/Deslocamento'
import { Pericia } from '../main/api/entities/Pericia'
import { Proficiencia } from '../main/api/entities/Proficiencia'
import { DeepPartial } from 'typeorm'
import { Poder } from '../main/api/entities/Poder'
import { Grimorio, Magia } from '../main/api/entities/Magia'
import { Status } from '../main/api/entities/Status'
import { Efeito } from '../main/api/entities/Efeito'
import { ICompendio } from '../main/@types/T20 GOTY/ICompendio'

// Custom APIs for renderer
const api = {
  personagens: {
    getTodosPersonagem: (): Promise<Personagem[]> => ipcRenderer.invoke('get-personagens'),
    getPersonagem: (_id: number): Promise<Personagem> => ipcRenderer.invoke('get-personagem', _id),
    postPersonagem: (_personagem: DeepPartial<Personagem>): Promise<void> =>
      ipcRenderer.invoke('post-personagem', _personagem),
    putPersonagem: (_personagem: Personagem): Promise<void> =>
      ipcRenderer.invoke('put-personagem', _personagem),
    deletePersonagem: (_id: number): Promise<void> => ipcRenderer.invoke('delete-personagem', _id)
  },

  atributos: {
    getAtributosPersonagem: (_idPersonagem: number): Promise<Atributo[]> =>
      ipcRenderer.invoke('get-atributos-personagem', _idPersonagem),
    putAtributo: (_atributo: Atributo): Promise<void> =>
      ipcRenderer.invoke('put-atributo', _atributo)
  },
  deslocamentos: {
    getDeslocamentoPersonagem: (_idPersonagem: number): Promise<Deslocamento> =>
      ipcRenderer.invoke('get-deslocamento-personagem', _idPersonagem),
    putDeslocamento: (_deslocamento: Deslocamento): Promise<void> =>
      ipcRenderer.invoke('put-deslocamento', _deslocamento)
  },

  efeitos: {
    getEfeitosPersonagem: (_idPersonagem: number): Promise<Efeito[]> =>
      ipcRenderer.invoke('get-efeitos-personagem', _idPersonagem),
    postEfeito: (_efeito: DeepPartial<Efeito>, _idPersonagem: number): Promise<void> =>
      ipcRenderer.invoke('post-efeito', _efeito, _idPersonagem),
    putEfeito: (_efeito: Efeito): Promise<void> => ipcRenderer.invoke('put-efeito', _efeito),
    deleteEfeito: (_id: number): Promise<void> => ipcRenderer.invoke('delete-efeito', _id)
  },
  magias: {
    putGrimorio: (_grimorio: Grimorio): Promise<void> =>
      ipcRenderer.invoke('put-grimorio', _grimorio),
    getGrimorioPersonagem: (_idPersonagem: number): Promise<Magia[]> =>
      ipcRenderer.invoke('get-grimorio-personagem', _idPersonagem),
    putMagia: (_magia: Magia): Promise<void> => ipcRenderer.invoke('put-magia', _magia),
    postMagia: (_magia: DeepPartial<Magia>, _idGrimorio: number): Promise<void> =>
      ipcRenderer.invoke('post-magia', _magia, _idGrimorio),
    deleteMagia: (_id: number): Promise<void> => ipcRenderer.invoke('delete-magia', _id)
  },
  compendio: {
    getCompendio: (): Promise<ICompendio> => ipcRenderer.invoke('get-compendio-t20')
  },
  poderes: {
    getPoderesPersonagem: (_idPersonagem: number): Promise<Poder[]> =>
      ipcRenderer.invoke('get-poderes-personagem', _idPersonagem),
    postPoder: (
      _poder: DeepPartial<Poder>,
      nivelPoder: number,
      _idPersonagem: number
    ): Promise<void> => ipcRenderer.invoke('post-poder', _poder, nivelPoder, _idPersonagem),
    deletePoder: (_id: number): Promise<void> => ipcRenderer.invoke('delete-poder', _id)
  },

  proficiencias: {
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

  pericias: {
    getPericiasPersonagem: (_idPersonagem: number): Promise<Pericia[]> =>
      ipcRenderer.invoke('get-pericias-personagem', _idPersonagem),
    putPericia: (_pericia: Pericia): Promise<void> => ipcRenderer.invoke('put-pericia', _pericia)
  },

  status: {
    getStatusPersonagem: (_idPersonagem: number): Promise<Status> =>
      ipcRenderer.invoke('get-status-personagem', _idPersonagem),
    putStatus: (_status: Status): Promise<void> => ipcRenderer.invoke('put-status', _status)
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
