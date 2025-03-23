import { IDeslocamento } from '../@types/t20/Deslocamento'
import { deslocamentoRepository } from '../repositories/DeslocamentoRepository'

export const putDeslocamento = async (_deslocamento: IDeslocamento): Promise<IDeslocamento> => {
  try {
    const deslocamento = deslocamentoRepository.create(_deslocamento)
    const deslocamentoEncontrado = await deslocamentoRepository.findOneBy({ id: deslocamento.id })
    if (deslocamentoEncontrado) {
      const deslocamentoAtualizado = { ...deslocamento }
      return await deslocamentoRepository.save(deslocamentoAtualizado)
    }
    throw new Error('Deslocamento não encontrado')
  } catch (err) {
    throw new Error('Ocorreu um erro ao atualizar deslocamento.')
  }
}
