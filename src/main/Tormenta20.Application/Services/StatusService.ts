import { prisma } from '../..'
import { IStatus } from '../../Tormenta20.Domain/@types/IStatus'

export const putStatus = async (id: number, _status: IStatus): Promise<void> => {
  try {
    await prisma.status.update({
      where: {
        id: id
      },
      data: {
        vidaAtual: _status.vidaAtual,
        vidaTemporaria: _status.vidaTemporaria,
        vidaMaximaBonus: _status.vidaMaximaBonus,
        atributoVidaMaxima: _status.atributoVidaMaxima,
        manaAtual: _status.manaAtual,
        manaTemporaria: _status.manaTemporaria,
        manaMaximaBonus: _status.manaMaximaBonus,
        atributoManaMaxima: _status.atributoManaMaxima,
        defesaBase: _status.defesaBase,
        defesaBonus: _status.defesaBonus,
        atributoDefesa: _status.atributoDefesa
      }
    })
  } catch {
    throw new Error('Erro ao atualizar o status')
  }
}
