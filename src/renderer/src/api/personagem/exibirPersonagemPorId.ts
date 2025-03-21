import { ICriatura } from '@renderer/@types/t20/Criatura'
import { carregarPersonagem } from '@renderer/utils/carregarPersonagem'

export const exibirPersonagemPorId = async (id: number): Promise<ICriatura> => {
  let personagem = await window.api.getPersonagem(id)
  personagem = await carregarPersonagem(personagem)
  return personagem
}
