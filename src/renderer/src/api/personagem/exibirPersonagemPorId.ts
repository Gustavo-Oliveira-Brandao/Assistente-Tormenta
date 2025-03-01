import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { carregarPersonagem } from '@renderer/utils/carregarPersonagem'

export const exibirPersonagemPorId = async (id: number): Promise<PersonagemT20> => {
  let personagem = await window.api.getPersonagem(id)
  personagem = await carregarPersonagem(personagem)
  return personagem
}
