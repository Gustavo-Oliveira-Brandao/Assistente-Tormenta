import { SQLiteDataSource } from '../data-source'
import { Recurso } from '../entity/recurso'

export const recursoRepository = SQLiteDataSource.getRepository(Recurso)
