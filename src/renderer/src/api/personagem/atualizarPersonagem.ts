import { PersonagemT20 } from '@renderer/@types/t20/Personagem'

export const atualizarPersonagem = async (_personagem: PersonagemT20): Promise<void> => {
  await window.api.postPersonagem(_personagem)
}
