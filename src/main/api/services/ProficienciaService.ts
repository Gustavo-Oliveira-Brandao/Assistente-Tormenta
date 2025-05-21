import { DeepPartial } from 'typeorm'
import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entities/Personagem'
import { Proficiencia } from '../entities/Proficiencia'

export const ProficienciaRepository = SQLiteDataSource.getRepository(Proficiencia)

export const getProficienciasPorPersonagem = async (
  _idPersonagem: number
): Promise<Proficiencia[]> => {
  try {
    const proficiencias = await ProficienciaRepository.find({
      where: { personagem: { id: _idPersonagem } }
    })
    return proficiencias
  } catch (err) {
    throw new Error('Erro ao buscar proficiencias: ' + err)
  }
}

export const postProficiencia = async (
  _proficiencia: DeepPartial<Proficiencia>,
  _idPersonagem: number
): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({ id: _idPersonagem })

    if (!personagem) {
      throw new Error('Personagem não encontrado!')
    }

    const novaProficiencia = ProficienciaRepository.create({
      ..._proficiencia,
      personagem: personagem
    })

    await ProficienciaRepository.save(novaProficiencia)
  } catch {
    throw new Error('Erro ao criar proficiencia!')
  }
}

export const putProficiencia = async (_proficiencia: Proficiencia): Promise<void> => {
  try {
    const proficienciaEncontrada = await ProficienciaRepository.findOneBy({ id: _proficiencia.id })
    if (proficienciaEncontrada == null) {
      throw new Error('Proficiência não encontrada!')
    }

    ProficienciaRepository.merge(proficienciaEncontrada, _proficiencia)

    await ProficienciaRepository.save(proficienciaEncontrada)
  } catch {
    throw new Error('Erro ao atualizar proficiencia')
  }
}

export const deleteProficiencia = async (_id: number): Promise<void> => {
  try {
    await ProficienciaRepository.delete(_id)
  } catch {
    throw new Error('Erro ao deletar proficiência!')
  }
}
