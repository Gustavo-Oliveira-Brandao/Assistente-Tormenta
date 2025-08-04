import { prisma } from '../..'
import { IPoder } from '../../Tormenta20.Domain/@types/IPoder'
import { IPoderPostRequestDTO } from '../DTOs/IPoder'

export const getPoderesPersonagem = async (idPersonagem: number): Promise<IPoder[]> => {
  try {
    const poderes = await prisma.poder.findMany({
      where: { personagemId: idPersonagem },
      include: {
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
  nivel: number,
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
        nivel: nivel,
        publicacao: poder.publicacao,
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
