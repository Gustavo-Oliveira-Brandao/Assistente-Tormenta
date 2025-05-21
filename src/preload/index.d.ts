import { ElectronAPI } from '@electron-toolkit/preload'
import { IClasse } from '@renderer/@types/T20 GOTY/IClasse'
import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { IRaca } from '@renderer/@types/T20 GOTY/IRaca'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      personagem: {
        getTodosPersonagem: () => Promise<Personagem[]>
        getPersonagem: (id: number) => Promise<Personagem>
        postPersonagem: (personagem: Partial<Personagem>) => Promise<void>
        putPersonagem: (personagem: Personagem) => Promise<void>
        deletePersonagem: (id: number) => Promise<void>
      }
      atributo: {
        putAtributo: (atributo: Atributo) => Promise<void>
      }
      classe: {
        getClassesDefault: () => Promise<Partial<IClasse[]>>
        postClasse: (classe: Partial<Classe>, idPersonagem: number) => Promise<void>
        putClasse: (classe: Classe) => Promise<void>
        deleteClasse: (id: number) => Promise<void>
      }
      raca: {
        getRacasDefault: () => Promise<Partial<IRaca[]>>
      }
      deslocamento: {
        putDeslocamento: (deslocamento: Deslocamento) => Promise<void>
      }
      magia: {
        getGrimoriosPorPersonagem: (_idPersonagem: number) => Promise<Grimorio[]>
        postGrimorio: (grimorio: Partial<Grimorio>, idPersonagem: number) => Promise<void>
        putGrimorio: (grimorio: Grimorio) => Promise<void>
        deleteGrimorio: (id: number) => Promise<void>
        postMagia: (magia: Partial<Magia>, idGrimorio: number) => Promise<void>
        deleteMagia: (id: number) => Promise<void>
      }
      poder: {
        getPoderesDefault: () => Promise<Partial<IPoder[]>>
        getPoderesPorPersonagem: (_idPersonagem: number) => Promise<Poder[]>
        getPoderesPorClasse: (_idClasse: number) => Promise<Poder[]>
        postPoder: (poder: Partial<Poder>, idPersonagem: number) => Promise<void>
        deletePoder: (id: number) => Promise<void>
      }
      proficiencia: {
        getProficienciasPorPersonagem: (_idPersonagem: number) => Promise<Proficiencia[]>
        postProficiencia: (
          proficiencia: Partial<Proficiencia>,
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
