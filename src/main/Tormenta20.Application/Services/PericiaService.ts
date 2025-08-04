import { prisma } from '../..'
import { IPericia } from '../../Tormenta20.Domain/@types/IPericia'

export const putPericia = async (id: number, _pericia: IPericia): Promise<void> => {
  try {
    await prisma.pericia.update({
      where: {
        id: id
      },
      data: {
        nome: _pericia.nome,
        bonus: _pericia.bonus,
        ehTreinado: _pericia.ehTreinado,
        categoria: _pericia.categoria,
        atributo: _pericia.atributo,
        requerTreinamento: _pericia.requerTreinamento,
        sofrePenalidadeArmadura: _pericia.sofrePenalidadeArmadura
      }
    })
  } catch {
    throw new Error('Ocorreu um erro ao atualizar pericia!')
  }
}
