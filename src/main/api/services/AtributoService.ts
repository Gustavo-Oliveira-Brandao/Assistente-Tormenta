import { prisma } from '../..'
import { IAtributo } from '../../@types/T20 GOTY/IAtributo'

export const putAtributo = async (id: number, _atributo: IAtributo): Promise<void> => {
  try {
    await prisma.atributo.update({
      where: {
        id: id
      },
      data: {
        valorBase: _atributo.valorBase,
        bonus: _atributo.bonus
      }
    })
  } catch {
    throw new Error('Ocorreu um erro ao atualizar o atributo.')
  }
}
