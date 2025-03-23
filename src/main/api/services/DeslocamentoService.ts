import { IDeslocamento } from '../@types/t20/Deslocamento'
import { deslocamentoRepository } from '../repositories/DeslocamentoRepository'

export const putDeslocamento = async (_deslocamento: IDeslocamento): Promise<IDeslocamento> => {
  const deslocamento = deslocamentoRepository.create(_deslocamento)
  return await deslocamentoRepository
    .update(deslocamento.id, deslocamento)
    .then((deslocamento) => {
      return deslocamento
    })
    .catch((err) => {
      return err
    })
}
