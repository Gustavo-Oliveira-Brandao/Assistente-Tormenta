import { IDeslocamento } from '../@types/T20 GOTY/IDeslocamento'
import { SQLiteDataSource } from '../data-source'
import { Deslocamento } from '../entities/Deslocamento'

export const DeslocamentoRepository = SQLiteDataSource.getRepository(Deslocamento)

export const putDeslocamento = async (_deslocamento: IDeslocamento): Promise<void> => {
  try {
    const deslocamento = DeslocamentoRepository.create(_deslocamento)
    let deslocamentoEncontrado = await DeslocamentoRepository.findOneBy({ id: deslocamento.id })
    if (deslocamentoEncontrado == null) {
      throw new Error('Deslocamento não encontrado!')
    }
    deslocamentoEncontrado = { ...deslocamento }
    await DeslocamentoRepository.save(deslocamentoEncontrado)
  } catch {
    throw new Error('Ocorreu um erro ao atualizar o deslocamento.')
  }
}
