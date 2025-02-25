import { ElectronAPI } from '@electron-toolkit/preload'
import { Atributo } from '@renderer/@types/t20/Atributo'
import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { Poder } from '@renderer/@types/t20/Poder'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getTodosPersonagens: () => PersonagemT20[]
      getPersonagem: (id: number) => PersonagemT20
      postPersonagem: (personagem: Partial<PersonagemT20>) => PersonagemT20
      putPersonagem: (personagem: PersonagemT20) => PersonagemT20
      deletePersonagem: (id: number) => void
      postPoder: (_poder: Poder, idPersonagem: number) => Poder
      deletePoder: (id: number) => void
      putAtributo: (atributo: Atributo) => Atributo
    }
  }
}
