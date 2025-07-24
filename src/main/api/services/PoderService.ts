import { prisma } from '../..'
import { IPoder, IPoderPostRequestDTO } from '../../@types/T20 GOTY/IPoder'

export const getPoderesPersonagem = async (idPersonagem: number): Promise<IPoder[]> => {
  try {
    const poderes = await prisma.poder.findMany({
      where: { personagemId: idPersonagem },
      include: {
        subEfeitos: true,
        tags: true
      }
    })
    return poderes
  } catch {
    throw new Error('Erro ao recuperar poderes')
  }
}

export const postPoder = async (
  poder: IPoderPostRequestDTO,
  nivelPoder: number,
  idPersonagem: number
): Promise<void> => {
  try {
    await prisma.poder.create({
      data: {
        key: poder.key,
        icone: poder.icone,
        nome: poder.nome,
        tempoExecucao: poder.tempoExecucao,
        descricao: poder.descricao,
        categoria: poder.categoria,
        fonte: poder.fonte,
        publicacao: poder.publicacao,
        nivel: nivelPoder,
        preRequisitos: poder.preRequisitos,
        subEfeitos: {
          create: poder.subEfeitos
        },
        tags: {
          create: poder.tags
        },
        personagem: {
          connect: {
            id: idPersonagem
          }
        }
      }
    })
  } catch {
    throw new Error('Erro ao adicionar poder!')
  }
}

export const deletePoder = async (id: number): Promise<void> => {
  try {
    await prisma.poder.delete({
      where: { id: id }
    })
  } catch {
    throw new Error('Erro ao deletar poder.')
  }
}
