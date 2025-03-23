import { SQLiteDataSource } from '../data-source'
import { Poder } from '../entity/poder'

export const poderRepository = SQLiteDataSource.getRepository(Poder)
