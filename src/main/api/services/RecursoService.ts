import { IRecurso } from '../@types/t20/Recurso'
import { manaRepository } from '../repositories/ManaRepository'
import { vidaRepository } from '../repositories/VidaRepository'

export const putVida = async (_vida: IRecurso): Promise<IRecurso> => {
  try {
    const vida = vidaRepository.create(_vida)
    const vidaEncontrada = await vidaRepository.findOneBy({ id: vida.id })
    if (vidaEncontrada) {
      const vidaAtualizada = { ...vida }
      return await vidaRepository.save(vidaAtualizada)
    }
    throw new Error('Recurso não encontrado')
  } catch (err) {
    throw new Error('Erro ao atualizar vida.')
  }
}

export const putMana = async (_mana: IRecurso): Promise<IRecurso> => {
  try {
    const mana = manaRepository.create(_mana)
    const manaEncontrada = await manaRepository.findOneBy({ id: mana.id })
    if (manaEncontrada) {
      const manaAtualizada = { ...mana }
      return await manaRepository.save(manaAtualizada)
    }
    throw new Error('Recurso não encontrado')
  } catch (err) {
    throw new Error('Erro ao atualizar mana.')
  }
}
