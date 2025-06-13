import { ElectronAPI } from '@electron-toolkit/preload'
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
        getClassesDefault: () => Promise<IClasse[]>
      }
      racas: {
        getRacasDefault: () => Promise<IRaca[]>
      }
      deslocamento: {
        putDeslocamento: (deslocamento: Deslocamento) => Promise<void>
      }
      magia: {
        getMagiasDefault: () => Promise<IMagiaDB[]>
        getGrimoriosPorPersonagem: (_idPersonagem: number) => Promise<Grimorio[]>
        postGrimorio: (grimorio: DeepPartial<Grimorio>, idPersonagem: number) => Promise<void>
        putGrimorio: (grimorio: Grimorio) => Promise<void>
        deleteGrimorio: (id: number) => Promise<void>
        postMagia: (magia: Partial<MagiaRef>, idGrimorio: number) => Promise<void>
        deleteMagia: (id: number) => Promise<void>
      }
      poder: {
        getPoderesDefault: () => Promise<IPoderDB[]>
        getPoderesPersonagem: (_idPersonagem: number) => Promise<IPoderRef[]>
        postPoder: (poder: Partial<PoderRef>, _idPersonagem: number) => Promise<void>
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
