import { DeepPartial } from 'typeorm'
import { SQLiteDataSource } from '../data-source'
import { Efeito, Modificador } from '../entities/Efeito'
import { Personagem } from '../entities/Personagem'

export const EfeitoRepository = SQLiteDataSource.getRepository(Efeito)
const ModificadorRepository = SQLiteDataSource.getRepository(Modificador)

export const getEfeitosPersonagem = async (_idPersonagem: number): Promise<Efeito[]> => {
  try {
    const efeitos = await EfeitoRepository.find({
      where: { personagem: { id: _idPersonagem } }
    })
    return efeitos
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao recuperar efeitos!')
  }
}

export const postEfeito = async (
  _efeito: DeepPartial<Efeito>,
  _idPersonagem: number
): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({ id: _idPersonagem })
    if (!personagem) {
      throw new Error('Personagem não encontrado!')
    }

    const novoEfeito = EfeitoRepository.create({
      ..._efeito,
      modificadores: _efeito.modificadores,
      personagem: personagem
    })

    await EfeitoRepository.save(novoEfeito)
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao adicionar efeito.')
  }
}

export const putEfeito = async (_efeito: Efeito): Promise<void> => {
  try {
    const efeitoEncontrado = await EfeitoRepository.findOneBy({ id: _efeito.id })
    if (!efeitoEncontrado) {
      throw new Error('Efeito não encontrado!')
    }

    EfeitoRepository.merge(efeitoEncontrado, _efeito)
    efeitoEncontrado.modificadores = _efeito.modificadores

    await EfeitoRepository.save(efeitoEncontrado)
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao atualizar efeito!')
  }
}

export const putModificador = async (_modificador: Modificador): Promise<void> => {
  try {
    const modificadorEncontrado = await ModificadorRepository.findOne({
      where: { id: _modificador.id }
    })

    if (!modificadorEncontrado) {
      throw new Error('Modificador não encontrado!')
    }

    ModificadorRepository.merge(modificadorEncontrado, _modificador)

    await ModificadorRepository.save(modificadorEncontrado)
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao atualizar modificador!')
  }
}

export const deleteEfeito = async (_id: number): Promise<void> => {
  try {
    await EfeitoRepository.delete(_id)
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao deletar efeito')
  }
}

export const deleteModificador = async (_id: number): Promise<void> => {
  try {
    await ModificadorRepository.delete(_id)
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao deletar modificador.')
  }
}
