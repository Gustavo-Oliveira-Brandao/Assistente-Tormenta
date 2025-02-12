import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { carregarPersonagem } from '@renderer/utils/carregarPersonagem'
import axios from 'axios'

export const exibirTodosPersonagens = async (): Promise<PersonagemT20[]> => {
  const personagens = await window.api.getTodosPersonagem()
  console.log(personagens)
  return personagens
}
export const exibirPersonagemPorId = async (id: number): Promise<PersonagemT20> => {
  console.log(id)
  let personagem = (await axios.get<PersonagemT20>('./data/t20/personagemVercel.json')).data
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
