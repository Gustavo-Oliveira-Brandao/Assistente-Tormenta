import { ICriatura } from '../@types/t20/Criatura'
import { criaturaRepository } from '../repositories/CriaturaRepository'

export const getTodosPersonagens = async (): Promise<ICriatura[]> => {
  try {
    const personagensEncontrados = await criaturaRepository.find()
    return personagensEncontrados
  } catch (err) {
    throw new Error('Erro ao exibir personagens.')
  }
}

export const getPersonagem = async (id: number): Promise<ICriatura> => {
  try {
    const personagemEncontrado = await criaturaRepository.findOneBy({ id: id })
    if (personagemEncontrado) {
      return personagemEncontrado
    }
    throw new Error('Personagem não encontrado.')
  } catch (err) {
    throw new Error('Erro ao exibir personagem.')
  }
}

export const postPersonagem = async (_personagem: Partial<ICriatura>): Promise<ICriatura> => {
  try {
    const personagem = criaturaRepository.create(_personagem)
    return await criaturaRepository.save(personagem)
  } catch (err) {
    throw new Error('Erro ao criar personagem.')
  }
}

export const putPersonagem = async (_personagem: ICriatura): Promise<ICriatura> => {
  try {
    const personagemEncontrado = await criaturaRepository.findOneBy({ id: _personagem.id })
    if (personagemEncontrado && personagemEncontrado.categoria === 'pj') {
      personagemEncontrado.nome = _personagem.nome
      personagemEncontrado.raca = _personagem.raca
      personagemEncontrado.classe = _personagem.classe ?? 'guerreiro'
      personagemEncontrado.origem = _personagem.origem ?? 'taverneiro'
      personagemEncontrado.divindade = _personagem.divindade ?? 'nenhum'
      personagemEncontrado.nivel = _personagem.nivel
      personagemEncontrado.experiencia = _personagem.experiencia ?? 0
      personagemEncontrado.alinhamento = _personagem.alinhamento ?? 'n'
      personagemEncontrado.tamanho = _personagem.tamanho
      personagemEncontrado.tipoCriatura = _personagem.tipoCriatura
      return await criaturaRepository.save(personagemEncontrado)
    }
    throw new Error('Personagem não encontrado.')
  } catch (err) {
    throw new Error('Erro ao atualizar o personagem.')
  }
}

export const deletePersonagem = async (id: number): Promise<void> => {
  try {
    await criaturaRepository.delete(id)
  } catch (err) {
    throw new Error('Erro ao deletar personagem.')
  }
}
