import { IAtributo } from '../@types/T20 GOTY/IAtributo'
import { SQLiteDataSource } from '../data-source'
import { Atributo } from '../entities/Atributo'

const atributoRepository = SQLiteDataSource.getRepository(Atributo)

export const putAtributo = async (_atributo: IAtributo): Promise<void> => {
  try {
    const atributo = atributoRepository.create(_atributo)
    let atributoEncontrado = await atributoRepository.findOneBy({ id: atributo.id })
    if (atributoEncontrado == null) {
      throw new Error('Atributo não encontrado!')
    }
    atributoEncontrado = { ...atributo }
    await atributoRepository.save(atributoEncontrado)
  } catch {
    throw new Error('Ocorreu um erro ao atualizar o atributo.')
  }
}
