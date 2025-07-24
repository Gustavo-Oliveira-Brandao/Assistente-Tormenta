import { ElectronAPI } from '@electron-toolkit/preload'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      personagens: {
        getTodosPersonagem: () => Promise<IPersonagemResponseManyDTO[]>
        getPersonagem: (_id: number) => Promise<IPersonagemFinal>
        postPersonagem: (nomePersonagem: string) => Promise<void>
        putPersonagem: (id: number, _personagem: Personagem) => Promise<void>
        deletePersonagem: (_id: number) => Promise<void>
        putRaca: (id: number, raca: IRacaRequestPutDTO) => Promise<void>
        postClasse: (classe: IClasseRequestPostDTO, idPersonagem: number) => Promise<void>
        putClasse: (id: number, classe: IClasseRequestPutDTO) => Promise<void>
        deleteClasse: (id: number) => Promise<void>
      }
      atributos: {
        putAtributo: (id: number, _atributo: Atributo) => Promise<void>
      }
      deslocamentos: {
        putDeslocamento: (id: number, _deslocamento: Deslocamento) => Promise<void>
      }
      efeitos: {
        postEfeito: (_efeito: IEfeitoPostRequestDTO, _idPersonagem: number) => Promise<void>
        putEfeito: (id: number, _efeito: IEfeito) => Promise<void>
        deleteEfeito: (_id: number) => Promise<void>
      }
      magias: {
        putGrimorio: (id: number, _grimorio: IGrimorio) => Promise<void>
        getGrimorioPersonagem: (_idPersonagem: number) => Promise<IGrimorio>
        putMagia: (id: number, _magia: IMagia) => Promise<void>
        postMagia: (_magia: IMagiaPostRequestDTO, _idGrimorio: number) => Promise<void>
        deleteMagia: (_id: number) => Promise<void>
      }
      compendio: {
        getCompendio: () => Promise<ICompendio>
      }
      poderes: {
        getPoderesPersonagem: (_idPersonagem: number) => Promise<IPoder[]>
        postPoder: (
          _poder: IPoderPostRequestDTO,
          nivelPoder: number,
          _idPersonagem: number
        ) => Promise<void>
        deletePoder: (_id: number) => Promise<void>
      }
      proficiencias: {
        postProficiencia: (
          _proficiencia: IProficienciaPostRequestDTO,
          _idPersonagem: number
        ) => Promise<void>
        putProficiencia: (id: number, _proficiencia: Proficiencia) => Promise<void>
        deleteProficiencia: (_id: number) => Promise<void>
      }
      pericias: {
        putPericia: (id: number, _pericia: IPericia) => Promise<void>
      }
      status: {
        putStatus: (id: number, _status: IStatus) => Promise<void>
      }
    }
  }
}
