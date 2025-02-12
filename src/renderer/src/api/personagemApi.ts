import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { carregarPersonagem } from '@renderer/utils/carregarPersonagem'

export const exibirTodosPersonagens = async (): Promise<PersonagemT20[]> => {
  return await window.api.getTodosPersonagens()
}
export const exibirPersonagemPorId = async (id: number): Promise<PersonagemT20> => {
  let personagem = await window.api.getPersonagem(id)
  personagem = await carregarPersonagem(personagem)
  return personagem
}

export const criarPersonagem = async (_personagem: PersonagemT20): Promise<void> => {
  await window.api.postPersonagem(_personagem)
}

export const atualizarPersonagem = async (_personagem: PersonagemT20): Promise<void> => {
  await window.api.putPersonagem(_personagem)
}

export const deletarPersonagem = async (id: number): Promise<void> => {
  await window.api.deletePersonagem(id)
}
