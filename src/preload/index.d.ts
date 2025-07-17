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
      compendio: {
        getCompendio: () => Promise<ICompendio>
      }
      atributos: {
        getAtributosPersonagem: (_idPersonagem: number) => Promise<IAtributo[]>
        putAtributo: (atributo: Atributo) => Promise<void>
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
        putGrimorio: (_grimorio: Grimorio) => Promise<void>
        getGrimorioPersonagem: (_idPersonagem: number) => Promise<Grimorio>
        putMagia: (magia: Magia) => Promise<void>
        postMagia: (magia: DeepPartial<Magia>, idGrimorio: number) => Promise<void>
        deleteMagia: (id: number) => Promise<void>
      }
      poderes: {
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
