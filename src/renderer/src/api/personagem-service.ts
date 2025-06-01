import { INivel } from '@renderer/@types/T20 GOTY/INivel'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { carregarPersonagem } from '@renderer/utils/carregarPersonagem'
import { DeepPartial } from 'typeorm'

export const exibirTodosPersonagens = async (): Promise<IPersonagem[]> => {
  return await window.api.personagem.getTodosPersonagem()
}

export const exibirPersonagemPorId = async (id: number): Promise<IPersonagem> => {
  const personagemBruto = await window.api.personagem.getPersonagem(id)
  const personagem = await carregarPersonagem(personagemBruto)
  return personagem
}

export const exibirProgressaoPersonagem = async (_idPersonagem: number): Promise<INivel[]> => {
  const niveis = await window.api.personagem.getProgressaoPersonagem(_idPersonagem)
  console.log(niveis)
  return niveis
}

export const criarPersonagem = async (personagem: DeepPartial<IPersonagem>): Promise<void> => {
  await window.api.personagem.postPersonagem(personagem)
}

export const atualizarPersonagem = async (personagem: IPersonagem): Promise<void> => {
  await window.api.personagem.putPersonagem(personagem)
}

export const deletarPersonagem = async (id: number): Promise<void> => {
  await window.api.personagem.deletePersonagem(id)
}
