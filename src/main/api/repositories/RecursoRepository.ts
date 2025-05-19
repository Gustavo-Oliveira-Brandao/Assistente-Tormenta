import { SQLiteDataSource } from '../data-source'
import { Recurso } from '../entities/Recurso'

export const RecursoRepository = SQLiteDataSource.getRepository(Recurso)
