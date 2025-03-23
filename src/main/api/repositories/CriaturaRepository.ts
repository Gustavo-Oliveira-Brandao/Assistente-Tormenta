import { SQLiteDataSource } from '../data-source'
import { Criatura } from '../entity/criatura'

export const criaturaRepository = SQLiteDataSource.getRepository(Criatura)
