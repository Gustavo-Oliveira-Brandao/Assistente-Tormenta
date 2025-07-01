import { SQLiteDataSource } from '../data-source'
import { Pericia } from '../entities/Pericia'

export const PericiaRepository = SQLiteDataSource.getRepository(Pericia)

export const getPericiasPersonagem = async (_idPersonagem: number): Promise<Pericia[]> => {
  try {
    const pericias = await PericiaRepository.find({ where: { personagem: { id: _idPersonagem } } })
    return pericias
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao recuperar pericias!')
  }
}

export const putPericia = async (_pericia: Pericia): Promise<void> => {
  try {
    const periciaEncontrada = await PericiaRepository.findOneBy({ id: _pericia.id })
    if (!periciaEncontrada) {
      throw new Error('Pericia não encontrada!')
    }
    PericiaRepository.merge(periciaEncontrada, _pericia)
    await PericiaRepository.save(periciaEncontrada)
  } catch {
    throw new Error('Ocorreu um erro ao atualizar pericia!')
  }
}
