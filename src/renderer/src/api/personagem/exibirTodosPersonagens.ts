import { PersonagemT20 } from '@renderer/@types/t20/Personagem'

export const exibirTodosPersonagens = async (): Promise<PersonagemT20[]> => {
  return await window.api.getTodosPersonagens()
}
