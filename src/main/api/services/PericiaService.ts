import { IPericia } from '../@types/t20/Pericia'
import { periciaRepository } from '../repositories/PericiaRepository'

export const putPericia = async (_pericia: IPericia): Promise<IPericia> => {
  const pericia = periciaRepository.create(_pericia)
  return await periciaRepository
    .update(pericia.id, pericia)
    .then((pericia) => {
      return pericia
    })
    .catch((err) => {
      return err
    })
}
