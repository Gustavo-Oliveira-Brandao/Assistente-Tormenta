import { ElectronAPI } from '@electron-toolkit/preload'
import { Atributo } from '@renderer/@types/t20/Atributo'
import { Defesa } from '@renderer/@types/t20/Defesa'
import { Deslocamento } from '@renderer/@types/t20/Deslocamento'
import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { Poder } from '@renderer/@types/t20/Poder'
import { Recurso } from '@renderer/@types/t20/Recurso'

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
      putVida: (vida: Recurso) => Recurso
      putMana: (mana: Recurso) => Recurso
      putDefesa: (defesa: Defesa) => Defesa
      putDeslocamento: (deslocamento: Deslocamento) => Deslocamento
    }
  }
}
