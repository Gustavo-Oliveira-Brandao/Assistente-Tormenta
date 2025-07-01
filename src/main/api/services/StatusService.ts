import { SQLiteDataSource } from '../data-source'
import { Status } from '../entities/Status'

export const statusRepository = SQLiteDataSource.getRepository(Status)

export const getStatusPersonagem = async (_idPersonagem: number): Promise<Status> => {
  try {
    const status = await statusRepository.findOne({ where: { personagem: { id: _idPersonagem } } })
    if (!status) {
      throw new Error('Status não encontrado!')
    }
    return status
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao recuperar recursos!')
  }
}

export const putRecurso = async (_status: Status): Promise<void> => {
  try {
    const recursoEncontrado = await statusRepository.findOneBy({ id: _status.id })
    if (!recursoEncontrado) {
      throw new Error('Recurso não encontrado!')
    }
    statusRepository.merge(recursoEncontrado, _status)

    await statusRepository.save(recursoEncontrado)
  } catch {
    throw new Error('Erro ao atualizar o recurso')
  }
}
