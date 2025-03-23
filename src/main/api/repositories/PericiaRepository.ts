import { SQLiteDataSource } from '../data-source'
import { Pericia } from '../entity/pericia'

export const periciaRepository = SQLiteDataSource.getRepository(Pericia)
