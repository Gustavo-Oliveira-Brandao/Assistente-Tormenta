import { Proficiencia } from '@prisma/client'
import { prisma } from '../..'
import { IProficienciaPostRequestDTO } from '../DTOs/IProficiencia'

export const postProficiencia = async (
  _proficiencia: IProficienciaPostRequestDTO,
  _idPersonagem: number
): Promise<void> => {
  try {
    await prisma.proficiencia.create({
      data: {
        ..._proficiencia,
        personagem: {
          connect: {
            id: _idPersonagem
          }
        }
      }
    })
  } catch {
    throw new Error('Erro ao criar proficiencia!')
  }
}

export const putProficiencia = async (id: number, _proficiencia: Proficiencia): Promise<void> => {
  try {
    await prisma.proficiencia.update({
      where: {
        id: id
      },
      data: {
        nome: _proficiencia.nome,
        categoria: _proficiencia.categoria
      }
    })
  } catch {
    throw new Error('Erro ao atualizar proficiencia')
  }
}

export const deleteProficiencia = async (_id: number): Promise<void> => {
  try {
    await prisma.proficiencia.delete({
      where: { id: _id }
    })
  } catch {
    throw new Error('Erro ao deletar proficiência!')
  }
}
