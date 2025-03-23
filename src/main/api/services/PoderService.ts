import { IPoder } from '../@types/t20/Poder'
import { criaturaRepository } from '../repositories/CriaturaRepository'
import { poderRepository } from '../repositories/PoderRepository'

export const postPoder = async (_poder: IPoder, idPersonagem: number): Promise<IPoder> => {
  const poder = poderRepository.create(_poder)
  poder.personagem = await criaturaRepository
    .findOneBy({
      id: idPersonagem
    })
    .catch((err) => {
      return err
    })

  return await poderRepository.save(poder).catch((error) => {
    return error
  })
}

export const deletePoder = async (_id: number): Promise<void> => {
  await poderRepository.delete(_id)
}
