import { IDefesa } from '../@types/t20/Defesa'
import { defesaRepository } from '../repositories/DefesaRepository'

export const putDefesa = async (_defesa: IDefesa): Promise<IDefesa> => {
  try {
    const defesa = defesaRepository.create(_defesa)
    const defesaEncontrada = await defesaRepository.findOneBy({ id: defesa.id })
    if (defesaEncontrada) {
      const defesaAtualizada = { ...defesa }
      return await defesaRepository.save(defesaAtualizada)
    }
    throw new Error('Defesa não encontrada')
  } catch (err) {
    throw new Error('Ocorreu um erro ao atualizar defesa.')
  }
}
