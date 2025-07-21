import { SQLiteDataSource } from '../data-source'
import { Status } from '../entities/Status'

export const statusRepository = SQLiteDataSource.getRepository(Status)

export const putRecurso = async (_status: Status): Promise<void> => {
  try {
    const recursoEncontrado = await statusRepository.findOneBy({ id: _status.id })
    if (!recursoEncontrado) {
      throw new Error('Status não encontrado!')
    }
    statusRepository.merge(recursoEncontrado, _status)

    await statusRepository.save(recursoEncontrado)
  } catch {
    throw new Error('Erro ao atualizar o status')
  }
}
