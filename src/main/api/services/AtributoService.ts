import { IAtributo } from '../@types/t20/Atributo'
import { atributoRepository } from '../repositories/AtributoRepository'

export const putAtributo = async (_atributo: IAtributo): Promise<IAtributo> => {
  try {
    const atributo = atributoRepository.create(_atributo)
    const atributoEncontrado = await atributoRepository.findOneBy({ id: atributo.id })
    if (atributoEncontrado) {
      const atributoAtualizado = { ...atributo }
      return await atributoRepository.save(atributoAtualizado)
    }
    throw new Error('Atributo não encontrado')
  } catch (err) {
    throw new Error('Ocorreu um erro ao atualizar o atributo.')
  }
}
