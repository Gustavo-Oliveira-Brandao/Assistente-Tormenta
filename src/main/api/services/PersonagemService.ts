import { DeepPartial } from 'typeorm'
import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entities/Personagem'
import { calcularPersonagem } from '../utils/CalcularPersonagem'
import { IPersonagemDTO } from '../../@types/T20 GOTY/dto/IPersonagemDTO'

export const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)

export const getTodosPersonagem = async (): Promise<Personagem[]> => {
  try {
    const personagens = await PersonagemRepository.find()
    return personagens
  } catch {
    throw new Error('Erro ao exibir personagens!')
  }
}

export const getPersonagem = async (id: number): Promise<IPersonagemDTO> => {
  try {
    console.log('pedidoPersonagemRecebido:' + Date.now())
    const personagemBruto = await PersonagemRepository.findOne({
      where: { id: id },
      relations: {
        detalhesPJ: true,
        classes: true,
        atributos: true,
        pericias: true,
        deslocamento: true,
        status: true,
        efeitos: true,
        proficiencias: true
      }
    })

    if (personagemBruto == null) {
      throw new Error('Personagem não encontrado!')
    }

    const personagem = await calcularPersonagem(personagemBruto)

    return personagem
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao exibir personagem.')
  }
}

export const postPersonagem = async (_personagem: DeepPartial<Personagem>): Promise<void> => {
  try {
    const personagem = PersonagemRepository.create(_personagem)
    await PersonagemRepository.save(personagem)
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao criar personagem.')
  }
}

export const putPersonagem = async (_personagem: Personagem): Promise<void> => {
  try {
    const personagemEncontrado = await PersonagemRepository.findOneBy({ id: _personagem.id })
    if (personagemEncontrado) {
      PersonagemRepository.merge(personagemEncontrado, _personagem)
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
