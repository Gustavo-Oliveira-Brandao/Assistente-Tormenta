import { IRecurso } from '../@types/t20/Recurso'
import { recursoRepository } from '../repositories/RecursoRepository'

export const putRecurso = async (_recurso: IRecurso): Promise<IRecurso> => {
  try {
    const recurso = recursoRepository.create(_recurso)
    const recursoEncontrado = await recursoRepository.findOneBy({ id: recurso.id })
    if (recursoEncontrado) {
      const recursoAtualizada = { ...recurso }
      return await recursoRepository.save(recursoAtualizada)
    }
    throw new Error('Recurso não encontrado')
  } catch (err) {
    throw new Error('Erro ao atualizar o recurso.')
  }
}
