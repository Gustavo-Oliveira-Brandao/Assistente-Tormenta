import { ElectronAPI } from '@electron-toolkit/preload'
import { IAtributo } from '@renderer/@types/t20/Atributo'
import { ICriatura } from '@renderer/@types/t20/Criatura'
import { IMagia } from '@renderer/@types/t20/Magia'
import { IPericia } from '@renderer/@types/t20/Pericia'
import { IPoder } from '@renderer/@types/t20/Poder'
import { IRecurso } from '@renderer/@types/t20/Recurso'
import { DeepPartial } from 'react-hook-form'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getTodosPersonagens: () => ICriatura[]
      getPersonagem: (id: number) => ICriatura
      postPersonagem: (personagem: DeepPartial<ICriatura>) => ICriatura
      putPersonagem: (personagem: ICriatura) => ICriatura
      deletePersonagem: (id: number) => void
      postPoder: (_poder: IPoder, idPersonagem: number) => IPoder
      deletePoder: (id: number) => void
      putAtributo: (atributo: IAtributo) => IAtributo
      putRecurso: (recurso: IRecurso) => IRecurso
      putPericia: (pericia: IPericia) => IPericia
      postMagia: (magia: IMagia, idPersonagem: number) => IMagia
      deleteMagia: (id: number) => void
    }
  }
}
