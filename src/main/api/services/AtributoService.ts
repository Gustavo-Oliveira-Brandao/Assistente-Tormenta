import { SQLiteDataSource } from '../data-source'
import { Atributo } from '../entities/Atributo'

const atributoRepository = SQLiteDataSource.getRepository(Atributo)

export const putAtributo = async (_atributo: Atributo): Promise<void> => {
  try {
    console.log('atributoRecebido:' + Date.now())
    const atributoEncontrado = await atributoRepository.findOneBy({ id: _atributo.id })
    if (atributoEncontrado == null) {
      throw new Error('Atributo não encontrado!')
    }
    atributoRepository.merge(atributoEncontrado, _atributo)
    await atributoRepository.save(atributoEncontrado)
    console.log('atributoAtualizado:' + Date.now())
  } catch {
    throw new Error('Ocorreu um erro ao atualizar o atributo.')
  }
}
