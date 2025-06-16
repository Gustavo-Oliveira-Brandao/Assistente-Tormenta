import { ElectronAPI } from '@electron-toolkit/preload'
import { DeepPartial } from 'typeorm'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      personagens: {
        getTodosPersonagem: () => Promise<Personagem[]>
        getPersonagem: (id: number) => Promise<Personagem>
        postPersonagem: (personagem: DeepPartial<Personagem>) => Promise<void>
        putPersonagem: (personagem: Personagem) => Promise<void>
        deletePersonagem: (id: number) => Promise<void>
      }
      atributos: {
        putAtributo: (atributo: Atributo) => Promise<void>
      }
      classes: {
        getClassesDefault: () => Promise<IClasse[]>
      }
      racas: {
        getRacasDefault: () => Promise<IRaca[]>
      }
      deslocamentos: {
        putDeslocamento: (deslocamento: Deslocamento) => Promise<void>
      }
      magias: {
        getMagiasDefault: () => Promise<IMagiaDTO[]>
        getGrimoriosPorPersonagem: (_idPersonagem: number) => Promise<Grimorio[]>
        postGrimorio: (grimorio: DeepPartial<Grimorio>, idPersonagem: number) => Promise<void>
        putGrimorio: (grimorio: Grimorio) => Promise<void>
        deleteGrimorio: (id: number) => Promise<void>
        postMagia: (magia: IMagiaDTO, idGrimorio: number) => Promise<void>
        deleteMagia: (id: number) => Promise<void>
      }
      poderes: {
        getPoderesDefault: () => Promise<DeepPartial<Poder>[]>
        getPoderesPersonagem: (_idPersonagem: number) => Promise<Poder[]>
        postPoder: (poder: IPoderDTO, _idPersonagem: number) => Promise<void>
        deletePoder: (id: number) => Promise<void>
      }
      proficiencias: {
        getProficienciasPorPersonagem: (_idPersonagem: number) => Promise<Proficiencia[]>
        postProficiencia: (
          proficiencia: DeepPartial<Proficiencia>,
          idPersonagem: number
        ) => Promise<void>
        putProficiencia: (proficiencia: Proficiencia) => Promise<void>
        deleteProficiencia: (id: number) => Promise<void>
      }
      pericias: {
        putPericia: (pericia: Pericia) => Promise<void>
      }
      recursos: {
        putRecurso: (recurso: Recurso) => Promise<void>
      }
    }
  }
}
