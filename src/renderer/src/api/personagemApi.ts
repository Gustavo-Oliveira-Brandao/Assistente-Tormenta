import { Atributo } from '@renderer/@types/t20/Atributo'
import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { Poder } from '@renderer/@types/t20/Poder'
import { carregarPersonagem } from '@renderer/utils/carregarPersonagem'
import axios from 'axios'

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

export const adicionarPoder = async (poder: Poder, idPersonagem: number): Promise<void> => {
  await window.api.postPoder(poder, idPersonagem)
}

export const deletarPoder = async (id: number): Promise<void> => {
  await window.api.deletePoder(id)
}

export const criarPersonagemDemo = async (): Promise<void> => {
  const personagemDemo = (await axios.get('./data/t20/personagemVercel.json')).data
  await window.api.postPersonagem(personagemDemo)
}

export const atualizarAtributo = async (atributo: Atributo): Promise<void> => {
  await window.api.putAtributo(atributo)
}
