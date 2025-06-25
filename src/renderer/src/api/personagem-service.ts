import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { carregarPersonagem } from '@renderer/utils/carregarPersonagem'
import { DeepPartial } from 'typeorm'

export const exibirTodosPersonagens = async (): Promise<IPersonagem[]> => {
  return await window.api.personagens.getTodosPersonagem()
}

export const exibirPersonagemPorId = async (id: number): Promise<IPersonagem> => {
  const personagemBruto = await window.api.personagens.getPersonagem(id)
  console.log('personagemRecebidoDoBack:' + Date.now())
  const personagem = await carregarPersonagem(personagemBruto)
  console.log('personagemCarregado:' + Date.now())

  return personagem
}

export const criarPersonagem = async (personagem: DeepPartial<IPersonagem>): Promise<void> => {
  await window.api.personagens.postPersonagem(personagem)
}

export const atualizarPersonagem = async (personagem: IPersonagem): Promise<void> => {
  await window.api.personagens.putPersonagem(personagem)
}

export const deletarPersonagem = async (id: number): Promise<void> => {
  await window.api.personagens.deletePersonagem(id)
}
