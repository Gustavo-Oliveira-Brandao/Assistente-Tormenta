import { SQLiteDataSource } from '../data-source'
import { Pericia } from '../entities/Pericia'

export const PericiaRepository = SQLiteDataSource.getRepository(Pericia)
