import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { carregarPersonagem } from '@renderer/utils/carregarPersonagem'

export const exibirPersonagemPorId = async (id: number): Promise<PersonagemT20> => {
  let personagem = await window.api.getPersonagem(id)
  console.log(personagem)
  personagem = await carregarPersonagem(personagem)
  return personagem
}

export const criarPersonagem = async (_personagem: PersonagemT20): Promise<void> => {
  const personagem = await window.api.postPersonagem(_personagem)
  console.log(personagem)
}
