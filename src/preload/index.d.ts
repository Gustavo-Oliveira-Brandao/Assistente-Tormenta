import { ElectronAPI } from '@electron-toolkit/preload'
import { IAtributo } from '@renderer/@types/t20/Atributo'
import { ICriatura } from '@renderer/@types/t20/Criatura'
import { IDefesa } from '@renderer/@types/t20/Defesa'
import { IDeslocamento } from '@renderer/@types/t20/Deslocamento'
import { IPericia } from '@renderer/@types/t20/Pericia'
import { IPoder } from '@renderer/@types/t20/Poder'
import { IRecurso } from '@renderer/@types/t20/Recurso'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getTodosPersonagens: () => ICriatura[]
      getPersonagem: (id: number) => ICriatura
      postPersonagem: (personagem: Partial<ICriatura>) => ICriatura
      putPersonagem: (personagem: ICriatura) => ICriatura
      deletePersonagem: (id: number) => void
      postPoder: (_poder: IPoder, idPersonagem: number) => Poder
      deletePoder: (id: number) => void
      putAtributo: (atributo: IAtributo) => IAtributo
      putVida: (vida: IRecurso) => IRecurso
      putMana: (mana: IRecurso) => IRecurso
      putDefesa: (defesa: IDefesa) => IDefesa
      putDeslocamento: (deslocamento: IDeslocamento) => IDeslocamento
      putPericia: (pericia: IPericia) => IPericia
    }
  }
}
