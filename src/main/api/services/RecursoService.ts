import { SQLiteDataSource } from '../data-source'
import { Recurso } from '../entities/Recurso'

export const RecursoRepository = SQLiteDataSource.getRepository(Recurso)

export const putRecurso = async (_recurso: Recurso): Promise<void> => {
  try {
    const recursoEncontrado = await RecursoRepository.findOneBy({ id: _recurso.id })
    if (!recursoEncontrado) {
      throw new Error('Recurso não encontrado!')
    }
    RecursoRepository.merge(recursoEncontrado, _recurso)

    await RecursoRepository.save(recursoEncontrado)
  } catch {
    throw new Error('Erro ao atualizar o recurso')
  }
}
