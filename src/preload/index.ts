import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Atributo, Deslocamento, Personagem, Proficiencia } from '@prisma/client'
import {
  IPersonagemFinal,
  IPersonagemResponseManyDTO
} from '../main/Tormenta20.Application/DTOs/IPersonagem'
import { IRacaRequestPutDTO } from '../main/Tormenta20.Application/DTOs/IRaca'
import {
  IClasseRequestPostDTO,
  IClasseRequestPutDTO
} from '../main/Tormenta20.Application/DTOs/IClasse'
import { IEfeitoPostRequestDTO } from '../main/Tormenta20.Application/DTOs/IEfeito'
import { IEfeito } from '../main/Tormenta20.Domain/@types/IEfeito'
import { IGrimorio, IMagia } from '../main/Tormenta20.Domain/@types/IMagia'
import { IMagiaPostRequestDTO } from '../main/Tormenta20.Application/DTOs/IMagia'
import { ICompendio } from '../main/Tormenta20.Domain/@types/ICompendio'
import { IPoder } from '../main/Tormenta20.Domain/@types/IPoder'
import { IPoderPostRequestDTO } from '../main/Tormenta20.Application/DTOs/IPoder'
import { IProficienciaPostRequestDTO } from '../main/Tormenta20.Application/DTOs/IProficiencia'
import { IPericia } from '../main/Tormenta20.Domain/@types/IPericia'
import { IStatus } from '../main/Tormenta20.Domain/@types/IStatus'

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
      nivel: number,
      _idPersonagem: number
    ): Promise<void> => ipcRenderer.invoke('post-poder', _poder, nivel, _idPersonagem),
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
