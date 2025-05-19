import { SQLiteDataSource } from '../data-source'
import { Proficiencia } from '../entities/Proficiencia'

export const ProficienciaRepository = SQLiteDataSource.getRepository(Proficiencia)
