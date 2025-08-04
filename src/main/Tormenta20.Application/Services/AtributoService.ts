import { Atributo } from '@prisma/client'
import { prisma } from '../..'

export const putAtributo = async (id: number, _atributo: Atributo): Promise<void> => {
  try {
    await prisma.atributo.update({
      where: {
        id: id
      },
      data: {
        valorBase: _atributo.valorBase,
        bonus: _atributo.bonus,
        descricao: _atributo.descricao
      }
    })
  } catch {
    throw new Error('Ocorreu um erro ao atualizar o atributo.')
  }
}
