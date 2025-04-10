import { IPoder } from '../@types/t20/Poder'
import { criaturaRepository } from '../repositories/CriaturaRepository'
import { poderRepository } from '../repositories/PoderRepository'

export const getPoderesPorPersonagem = async (_idPersonagem: number): Promise<IPoder[]> => {
  try {
    const poderes = await poderRepository.find({ where: { personagem: { id: _idPersonagem } } })
    return poderes
  } catch (err) {
    throw new Error('Erro ao buscar poderes')
  }
}
export const postPoder = async (_poder: IPoder, idPersonagem: number): Promise<IPoder> => {
  try {
    const poder = poderRepository.create(_poder)
    poder.personagem = await criaturaRepository.findOneBy({ id: idPersonagem }).catch((err) => {
      return err
    })
    return await poderRepository.save(poder)
  } catch (err) {
    throw new Error('Erro ao adicionar poder ao personagem.')
  }
}

export const deletePoder = async (_id: number): Promise<void> => {
  try {
    await poderRepository.delete(_id)
  } catch (err) {
    throw new Error('Erro ao deletar poder.')
  }
}
