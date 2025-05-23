import { ElectronAPI } from '@electron-toolkit/preload'
import { IClasse } from '@renderer/@types/T20 GOTY/IClasse'
import { IMagia } from '@renderer/@types/T20 GOTY/IMagia'
import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { IRaca } from '@renderer/@types/T20 GOTY/IRaca'
import { DeepPartial } from 'typeorm'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      personagem: {
        getTodosPersonagem: () => Promise<Personagem[]>
        getPersonagem: (id: number) => Promise<Personagem>
        postPersonagem: (personagem: DeepPartial<Personagem>) => Promise<void>
        putPersonagem: (personagem: Personagem) => Promise<void>
        deletePersonagem: (id: number) => Promise<void>
      }
      atributo: {
        putAtributo: (atributo: Atributo) => Promise<void>
      }
      classe: {
        getClassesDefault: () => Promise<DeepPartial<IClasse[]>>
        postClasse: (classe: DeepPartial<Classe>, idPersonagem: number) => Promise<void>
        putClasse: (classe: Classe) => Promise<void>
        deleteClasse: (id: number) => Promise<void>
      }
      raca: {
        getRacasDefault: () => Promise<DeepPartial<IRaca[]>>
      }
      deslocamento: {
        putDeslocamento: (deslocamento: Deslocamento) => Promise<void>
      }
      magia: {
        getMagiasDefault: () => Promise<DeepPartial<IMagia[]>>
        getGrimoriosPorPersonagem: (_idPersonagem: number) => Promise<Grimorio[]>
        postGrimorio: (grimorio: DeepPartial<Grimorio>, idPersonagem: number) => Promise<void>
        putGrimorio: (grimorio: Grimorio) => Promise<void>
        deleteGrimorio: (id: number) => Promise<void>
        postMagia: (magia: DeepPartial<Magia>, idGrimorio: number) => Promise<void>
        deleteMagia: (id: number) => Promise<void>
      }
      poder: {
        getPoderesDefault: () => Promise<DeepPartial<IPoder[]>>
        getPoderesPorPersonagem: (_idPersonagem: number) => Promise<Poder[]>
        getPoderesPorClasse: (_idClasse: number) => Promise<Poder[]>
        postPoder: (poder: DeepPartial<Poder>, idPersonagem: number) => Promise<void>
        deletePoder: (id: number) => Promise<void>
      }
      proficiencia: {
        getProficienciasPorPersonagem: (_idPersonagem: number) => Promise<Proficiencia[]>
        postProficiencia: (
          proficiencia: DeepPartial<Proficiencia>,
          idPersonagem: number
        ) => Promise<void>
        putProficiencia: (proficiencia: Proficiencia) => Promise<void>
        deleteProficiencia: (id: number) => Promise<void>
      }
      pericia: {
        putPericia: (pericia: Pericia) => Promise<void>
      }
      recurso: {
        putRecurso: (recurso: Recurso) => Promise<void>
      }
    }
  }
}
