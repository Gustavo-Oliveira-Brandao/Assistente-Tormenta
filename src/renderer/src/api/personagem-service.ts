import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { calcularPersonagem } from '@renderer/utils/calculos da ficha/Calcular_Personagem'

export const exibirTodosPersonagens = async (): Promise<IPersonagem[]> => {
  return await window.api.personagens.getTodosPersonagem()
}

export const exibirPersonagemPorId = async (id: number): Promise<IPersonagem> => {
  console.log('Requisição enviada: ' + Date.now())
  const personagem = await window.api.personagens.getPersonagem(id)
  const personagemCalculado = await calcularPersonagem(personagem)
  console.log('Requisição completa: ' + Date.now())
  return personagemCalculado
}

export const criarPersonagem = async (personagem: Partial<IPersonagem>): Promise<void> => {
  await window.api.personagens.postPersonagem(personagem)
}

export const atualizarPersonagem = async (personagem: IPersonagem): Promise<void> => {
  await window.api.personagens.putPersonagem(personagem)
}

export const deletarPersonagem = async (id: number): Promise<void> => {
  await window.api.personagens.deletePersonagem(id)
}
