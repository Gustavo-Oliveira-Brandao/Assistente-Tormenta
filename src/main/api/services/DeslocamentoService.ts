import { SQLiteDataSource } from '../data-source'
import { Deslocamento } from '../entities/Deslocamento'

export const DeslocamentoRepository = SQLiteDataSource.getRepository(Deslocamento)

export const getDeslocamentoPersonagem = async (_idPersonagem: number): Promise<Deslocamento> => {
  try {
    const deslocamento = await DeslocamentoRepository.findOne({
      where: { personagem: { id: _idPersonagem } }
    })

    if (!deslocamento) {
      throw new Error('Deslocamento não encontrado!')
    }
    return deslocamento
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao recuperar deslocamentos.')
  }
}

export const putDeslocamento = async (_deslocamento: Deslocamento): Promise<void> => {
  try {
    const deslocamentoEncontrado = await DeslocamentoRepository.findOneBy({ id: _deslocamento.id })
    if (!deslocamentoEncontrado) {
      throw new Error('Deslocamento não encontrado!')
    }

    DeslocamentoRepository.merge(deslocamentoEncontrado, _deslocamento)
    await DeslocamentoRepository.save(deslocamentoEncontrado)
  } catch {
    throw new Error('Ocorreu um erro ao atualizar o deslocamento.')
  }
}
