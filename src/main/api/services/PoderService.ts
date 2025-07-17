import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entities/Personagem'
import { Poder } from '../entities/Poder'
import { DeepPartial } from 'typeorm'

export const PoderRepository = SQLiteDataSource.getRepository(Poder)

export const getPoderesPersonagem = async (_idPersonagem: number): Promise<Poder[]> => {
  try {
    const poderes = await PoderRepository.find({ where: { personagem: { id: _idPersonagem } } })
    return poderes
  } catch {
    throw new Error('Erro ao recuperar poderes')
  }
}

export const postPoder = async (
  _poder: DeepPartial<Poder>,
  nivelPoder: number,
  _idPersonagem: number
): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({ id: _idPersonagem })
    if (!personagem) {
      throw new Error('Personagem não encontrado')
    }

    const novoPoder = PoderRepository.create({
      ..._poder,
      nivel: nivelPoder,
      tags: _poder.tags,
      subEfeitos: _poder.subEfeitos,
      personagem: personagem
    })
    await PoderRepository.save(novoPoder)
  } catch {
    throw new Error('Erro ao adicionar poder!')
  }
}

export const deletePoder = async (_id: number): Promise<void> => {
  try {
    await PoderRepository.delete(_id)
  } catch {
    throw new Error('Erro ao deletar poder.')
  }
}
