import { IPericia } from '../@types/t20/Pericia'
import { periciaRepository } from '../repositories/PericiaRepository'

export const putPericia = async (_pericia: IPericia): Promise<IPericia> => {
  try {
    const pericia = periciaRepository.create(_pericia)
    const periciaEncontrada = await periciaRepository.findOneBy({ id: pericia.id })
    if (periciaEncontrada) {
      const periciaAtualizada = { ...pericia }
      return await periciaRepository.save(periciaAtualizada)
    }
    throw new Error('Pericia não encontrada.')
  } catch (err) {
    throw new Error('Ocorreu um erro ao atualizar a pericia.')
  }
}
