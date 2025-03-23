import { SQLiteDataSource } from '../data-source'
import { Mana } from '../entity/mana'

export const manaRepository = SQLiteDataSource.getRepository(Mana)
