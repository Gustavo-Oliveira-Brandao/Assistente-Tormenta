import { SQLiteDataSource } from '../data-source'
import { Modificador } from '../entities/Modificador'
import { Personagem } from '../entities/Personagem'

export const ModificadorRepository = SQLiteDataSource.getRepository(Modificador)

export const postModificador = async (
  _modificador: Partial<Modificador>,
  _idPersonagem: number
): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({ id: _idPersonagem })
    if (!personagem) {
      throw new Error('Personagem não encontrado!')
    }

    const novoModificador = ModificadorRepository.create({
      ..._modificador,
      personagem: personagem
    })

    await ModificadorRepository.save(novoModificador)
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao adicionar modificador.')
  }
}

export const putModificador = async (_modificador: Modificador): Promise<void> => {
  try {
    const modificadorEncontrado = await ModificadorRepository.findOneBy({ id: _modificador.id })
    if (!modificadorEncontrado) {
      throw new Error('Grimorio não encontrado!')
    }

    ModificadorRepository.merge(modificadorEncontrado, _modificador)
    await ModificadorRepository.save(modificadorEncontrado)
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao atualizar modificador!')
  }
}

export const deleteModificador = async (_id: number): Promise<void> => {
  try {
    await ModificadorRepository.delete(_id)
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao deletar modificador')
  }
}
