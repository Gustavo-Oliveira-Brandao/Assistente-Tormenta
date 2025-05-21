import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'

export const exibirTodosPersonagens = async (): Promise<IPersonagem[]> => {
  return await window.api.personagem.getTodosPersonagem()
}

export const exibirPersonagemPorId = async (id: number): Promise<IPersonagem> => {
  return await window.api.personagem.getPersonagem(id)
}

export const criarPersonagem = async (personagem: Partial<IPersonagem>): Promise<void> => {
  await window.api.personagem.postPersonagem(personagem)
}

export const atualizarPersonagem = async (personagem: IPersonagem): Promise<void> => {
  await window.api.personagem.putPersonagem(personagem)
}

export const deletarPersonagem = async (id: number): Promise<void> => {
  await window.api.personagem.deletePersonagem(id)
}
