import { prisma } from '../..'
import { IDeslocamento } from '../../@types/T20 GOTY/IDeslocamento'

export const putDeslocamento = async (id: number, _deslocamento: IDeslocamento): Promise<void> => {
  try {
    await prisma.deslocamento.update({
      where: {
        id: id
      },
      data: {
        caminhadaBase: _deslocamento.caminhadaBase,
        vooBase: _deslocamento.vooBase,
        natacaoBase: _deslocamento.natacaoBase,
        escaladaBase: _deslocamento.escaladaBase,
        escavacaoBase: _deslocamento.escavacaoBase,
        plana: _deslocamento.plana
      }
    })
  } catch {
    throw new Error('Ocorreu um erro ao atualizar o deslocamento.')
  }
}
