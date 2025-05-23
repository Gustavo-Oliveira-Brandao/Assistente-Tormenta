import { SQLiteDataSource } from '../data-source'
import { Pericia } from '../entities/Pericia'

export const PericiaRepository = SQLiteDataSource.getRepository(Pericia)

export const putPericia = async (_pericia: Pericia): Promise<void> => {
  try {
    const periciaEncontrada = await PericiaRepository.findOneBy({ id: _pericia.id })
    if (!periciaEncontrada) {
      throw new Error('Pericia não encontrada!')
    }
    PericiaRepository.merge(periciaEncontrada, _pericia)
    periciaEncontrada.bonus = _pericia.bonus
    await PericiaRepository.save(periciaEncontrada)
  } catch {
    throw new Error('Ocorreu um erro ao atualizar pericia!')
  }
}
