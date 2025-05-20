import { DeepPartial } from 'typeorm'
import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entities/Personagem'

export const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)

export const getTodosPersonagem = async (): Promise<Personagem[]> => {
  try {
    const personagens = await PersonagemRepository.find({
      relations: {
        classes: true
      }
    })
    return personagens
  } catch {
    throw new Error('Erro ao exibir personagens!')
  }
}

export const getPersonagem = async (id: number): Promise<Personagem> => {
  try {
    const personagem = await PersonagemRepository.findOne({
      where: { id: id },
      relations: {
        classes: true,
        atributos: true,
        pericias: true,
        deslocamentos: true,
        recursos: true,
        proficiencias: true
      }
    })
    if (personagem == null) {
      throw new Error('Personagem não encontrado!')
    }
    return personagem
  } catch {
    throw new Error('Erro ao exibir personagem.')
  }
}

export const postPersonagem = async (_personagem: DeepPartial<Personagem>): Promise<void> => {
  try {
    const personagem = PersonagemRepository.create(_personagem)
    await PersonagemRepository.save(personagem)
  } catch {
    throw new Error('Erro ao criar personagem.')
  }
}

export const putPersonagem = async (_personagem: Personagem): Promise<void> => {
  try {
    const personagemEncontrado = await PersonagemRepository.findOneBy({ id: _personagem.id })
    if (personagemEncontrado) {
      personagemEncontrado.nome = _personagem.nome
      personagemEncontrado.raca = _personagem.raca
      personagemEncontrado.origem = _personagem.origem
      personagemEncontrado.divindade = _personagem.divindade
      personagemEncontrado.experiencia = _personagem.experiencia
      personagemEncontrado.alinhamentoEtico = _personagem.alinhamentoEtico
      personagemEncontrado.alinhamentoMoral = _personagem.alinhamentoMoral
      personagemEncontrado.altura = _personagem.altura
      personagemEncontrado.peso = _personagem.peso
      personagemEncontrado.tamanho = _personagem.tamanho
      personagemEncontrado.tipo = _personagem.tipo
      await PersonagemRepository.save(personagemEncontrado)
    }
    throw new Error('Personagem não encontrado!')
  } catch {
    throw new Error('Erro ao atualizar personagem.')
  }
}

export const deletePersonagem = async (id: number): Promise<void> => {
  try {
    await PersonagemRepository.delete(id)
  } catch {
    throw new Error('Erro ao deletar personagem.')
  }
}
