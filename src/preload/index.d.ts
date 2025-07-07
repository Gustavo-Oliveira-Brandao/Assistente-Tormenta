import { ElectronAPI } from '@electron-toolkit/preload'
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
        getAtributosPersonagem: (_idPersonagem: number) => Promise<IAtributo[]>
        putAtributo: (atributo: Atributo) => Promise<void>
      }
      classes: {
        getClassesDefault: () => Promise<IClasse[]>
      }
      racas: {
        getRacasDefault: () => Promise<IRaca[]>
      }
      deslocamentos: {
        getDeslocamentoPersonagem: (_idPersonagem: number) => Promise<IDeslocamento>
        putDeslocamento: (deslocamento: Deslocamento) => Promise<void>
      }
      efeitos: {
        getEfeitosPersonagem: (_idPersonagem: number) => Promise<IEfeito[]>
        postEfeito: (_efeito: DeepPartial<Efeito>, _idPersonagem: number) => Promise<void>
        putEfeito: (_efeito: Efeito) => Promise<void>
        deleteEfeito: (_id: number) => Promise<void>
      }
      magias: {
        getMagiasDefault: () => Promise<IMagiaDTO[]>
        getGrimoriosPorPersonagem: (_idPersonagem: number) => Promise<Grimorio[]>
        postGrimorio: (grimorio: DeepPartial<Grimorio>, idPersonagem: number) => Promise<void>
        putGrimorio: (grimorio: Grimorio) => Promise<void>
        deleteGrimorio: (id: number) => Promise<void>
        postMagia: (magia: DeepPartial<Magia>, idGrimorio: number) => Promise<void>
        deleteMagia: (id: number) => Promise<void>
      }
      poderes: {
        getPoderesDefault: () => Promise<DeepPartial<Poder>[]>
        getPoderesPersonagem: (_idPersonagem: number) => Promise<Poder[]>
        postPoder: (
          poder: DeepPartial<Poder>,
          nivelPoder: number,
          _idPersonagem: number
        ) => Promise<void>
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
        getPericiasPersonagem: (_idPersonagem: number) => Promise<IPericia[]>
        putPericia: (pericia: Pericia) => Promise<void>
      }
      status: {
        getStatusPersonagem: (_idPersonagem: number) => Promise<IStatus>
        putStatus: (status: Status) => Promise<void>
      }
    }
  }
}
