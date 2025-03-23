import { IDefesa } from '../@types/t20/Defesa'
import { defesaRepository } from '../repositories/DefesaRepository'

export const putDefesa = async (_defesa: IDefesa): Promise<IDefesa> => {
  const defesa = defesaRepository.create(_defesa)
  return await defesaRepository
    .update(defesa.id, defesa)
    .then((defesa) => {
      return defesa
    })
    .catch((err) => {
      return err
    })
}
