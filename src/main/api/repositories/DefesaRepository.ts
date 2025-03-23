import { SQLiteDataSource } from '../data-source'
import { Defesa } from '../entity/defesa'

export const defesaRepository = SQLiteDataSource.getRepository(Defesa)
