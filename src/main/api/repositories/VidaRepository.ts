import { SQLiteDataSource } from '../data-source'
import { Vida } from '../entity/vida'

export const vidaRepository = SQLiteDataSource.getRepository(Vida)
