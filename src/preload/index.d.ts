import { ElectronAPI } from '@electron-toolkit/preload'
import { PersonagemT20 } from '@renderer/@types/t20/Personagem'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getPersonagem: (id: number) => PersonagemT20
      postPersonagem: (personagem: Partial<PersonagemT20>) => PersonagemT20
    }
  }
}
