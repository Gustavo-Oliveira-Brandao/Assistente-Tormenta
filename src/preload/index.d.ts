import { ElectronAPI } from '@electron-toolkit/preload'
import { PersonagemT20 } from '@renderer/@types/t20/Personagem'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getTodosPersonagem: () => PersonagemT20[]
      getPersonagem: (id: number) => PersonagemT20
      postPersonagem: (personagem: Partial<PersonagemT20>) => PersonagemT20
      putPersonagem: (personagem: PersonagemT20) => PersonagemT20
      deletePersonagem: (id: number) => void
    }
  }
}
