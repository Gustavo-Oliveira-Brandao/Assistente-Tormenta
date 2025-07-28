import { IPersonagem } from "@renderer/@types/T20 GOTY/IPersonagem"

export const exibirTodosPersonagens = async (): Promise<IPersonagem[]> => {
  return await window.api.personagens.getTodosPersonagem()
}

export const exibirPersonagemPorId = async (id: number): Promise<IPersonagem> => {
  console.log('Requisição enviada: ' + Date.now())
  const personagem = await window.api.personagens.getPersonagem(id)
  console.log('Requisição completa: ' + Date.now())
  return personagem
}

export const criarPersonagem = async (nomePersonagem: string): Promise<void> => {
  await window.api.personagens.postPersonagem(nomePersonagem)
}

export const atualizarPersonagem = async (id: number, personagem: IPersonagem): Promise<void> => {
  await window.api.personagens.putPersonagem(id, personagem)
}

export const deletarPersonagem = async (id: number): Promise<void> => {
  await window.api.personagens.deletePersonagem(id)
}
