import { IAtributo } from '../@types/t20/Atributo'
import { atributoRepository } from '../repositories/AtributoRepository'

export const putAtributo = async (_atributo: IAtributo): Promise<IAtributo> => {
  const atributo = atributoRepository.create(_atributo)

  return await atributoRepository
    .findOneBy({
      id: atributo.id
    })
    .then(async (atributoEncontrado) => {
      if (atributoEncontrado) {
        atributoEncontrado = { ...atributo }
        return await atributoRepository.save(atributoEncontrado)
      }
      return 'Atributo não encontrado '
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}
