import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  IPersonagemFinal,
  IPersonagemResponseManyDTO
} from '../main/@types/T20 GOTY/IPersonagem'
import { Atributo, Deslocamento, Personagem, Proficiencia } from '@prisma/client'
import { IRacaRequestPutDTO } from '../main/@types/T20 GOTY/IRaca'
import { IClasseRequestPostDTO, IClasseRequestPutDTO } from '../main/@types/T20 GOTY/IClasse'
import { IEfeito, IEfeitoPostRequestDTO } from '../main/@types/T20 GOTY/IEfeito'
import { IGrimorio, IMagia, IMagiaPostRequestDTO } from '../main/@types/T20 GOTY/IMagia'
import { ICompendio } from '../main/@types/T20 GOTY/ICompendio'
import { IPoder, IPoderPostRequestDTO } from '../main/@types/T20 GOTY/IPoder'
import { IProficienciaPostRequestDTO } from '../main/@types/T20 GOTY/IProficiencia'
import { IPericia } from '../main/@types/T20 GOTY/IPericia'
import { IStatus } from '../main/@types/T20 GOTY/IStatus'

// Custom APIs for renderer
const api = {
  personagens: {
    getTodosPersonagem: (): Promise<IPersonagemResponseManyDTO[]> =>
      ipcRenderer.invoke('get-personagens'),
    getPersonagem: (_id: number): Promise<IPersonagemFinal> =>
      ipcRenderer.invoke('get-personagem', _id),
    postPersonagem: (nomePersonagem: string): Promise<void> =>
      ipcRenderer.invoke('post-personagem', nomePersonagem),
    putPersonagem: (id: number, _personagem: Personagem): Promise<void> =>
      ipcRenderer.invoke('put-personagem', id, _personagem),
    deletePersonagem: (_id: number): Promise<void> => ipcRenderer.invoke('delete-personagem', _id),
    putRaca: (id: number, raca: IRacaRequestPutDTO): Promise<void> =>
      ipcRenderer.invoke('put-raca', id, raca),
    postClasse: (classe: IClasseRequestPostDTO, idPersonagem: number): Promise<void> =>
      ipcRenderer.invoke('post-classe', classe, idPersonagem),
    putClasse: (id: number, classe: IClasseRequestPutDTO): Promise<void> =>
      ipcRenderer.invoke('put-classe', id, classe),
    deleteClasse: (id: number): Promise<void> => ipcRenderer.invoke('delete-classe', id)
  },

  atributos: {
    putAtributo: (id: number, _atributo: Atributo): Promise<void> =>
      ipcRenderer.invoke('put-atributo', id, _atributo)
  },
  deslocamentos: {
    putDeslocamento: (id: number, _deslocamento: Deslocamento): Promise<void> =>
      ipcRenderer.invoke('put-deslocamento', id, _deslocamento)
  },

  efeitos: {
    postEfeito: (_efeito: IEfeitoPostRequestDTO, _idPersonagem: number): Promise<void> =>
      ipcRenderer.invoke('post-efeito', _efeito, _idPersonagem),
    putEfeito: (id: number, _efeito: IEfeito): Promise<void> =>
      ipcRenderer.invoke('put-efeito', id, _efeito),
    deleteEfeito: (_id: number): Promise<void> => ipcRenderer.invoke('delete-efeito', _id)
  },
  magias: {
    putGrimorio: (id: number, _grimorio: IGrimorio): Promise<void> =>
      ipcRenderer.invoke('put-grimorio', id, _grimorio),
    getGrimorioPersonagem: (_idPersonagem: number): Promise<IGrimorio> =>
      ipcRenderer.invoke('get-grimorio-personagem', _idPersonagem),
    putMagia: (id: number, _magia: IMagia): Promise<void> =>
      ipcRenderer.invoke('put-magia', id, _magia),
    postMagia: (_magia: IMagiaPostRequestDTO, _idGrimorio: number): Promise<void> =>
      ipcRenderer.invoke('post-magia', _magia, _idGrimorio),
    deleteMagia: (_id: number): Promise<void> => ipcRenderer.invoke('delete-magia', _id)
  },
  compendio: {
    getCompendio: (): Promise<ICompendio> => ipcRenderer.invoke('get-compendio-t20')
  },
  poderes: {
    getPoderesPersonagem: (_idPersonagem: number): Promise<IPoder[]> =>
      ipcRenderer.invoke('get-poderes-personagem', _idPersonagem),
    postPoder: (
      _poder: IPoderPostRequestDTO,
      nivelPoder: number,
      _idPersonagem: number
    ): Promise<void> => ipcRenderer.invoke('post-poder', _poder, nivelPoder, _idPersonagem),
    deletePoder: (_id: number): Promise<void> => ipcRenderer.invoke('delete-poder', _id)
  },

  proficiencias: {
    postProficiencia: (
      _proficiencia: IProficienciaPostRequestDTO,
      _idPersonagem: number
    ): Promise<void> => ipcRenderer.invoke('post-proficiencia', _proficiencia, _idPersonagem),
    putProficiencia: (id: number, _proficiencia: Proficiencia): Promise<void> =>
      ipcRenderer.invoke('put-proficiencia', id, _proficiencia),
    deleteProficiencia: (_id: number): Promise<void> =>
      ipcRenderer.invoke('delete-proficiencia', _id)
  },

  pericias: {
    putPericia: (id: number, _pericia: IPericia): Promise<void> =>
      ipcRenderer.invoke('put-pericia', id, _pericia)
  },

  status: {
    putStatus: (id: number, _status: IStatus): Promise<void> =>
      ipcRenderer.invoke('put-status', id, _status)
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
