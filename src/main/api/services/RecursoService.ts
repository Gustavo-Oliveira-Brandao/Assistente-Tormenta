import { IRecurso } from '../@types/t20/Recurso'
import { manaRepository } from '../repositories/ManaRepository'
import { vidaRepository } from '../repositories/VidaRepository'

export const putVida = async (_vida: IRecurso): Promise<IRecurso> => {
  const vida = vidaRepository.create(_vida)
  return await vidaRepository
    .update(vida.id, vida)
    .then((vida) => {
      return vida
    })
    .catch((err) => {
      return err
    })
}

export const putMana = async (_mana: IRecurso): Promise<IRecurso> => {
  const mana = manaRepository.create(_mana)
  return await manaRepository
    .update(mana.id, mana)
    .then((mana) => {
      return mana
    })
    .catch((err) => {
      return err
    })
}
