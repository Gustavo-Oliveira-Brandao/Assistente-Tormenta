import { SQLiteDataSource } from '../data-source'
import { Magia } from '../entity/magia'

export const magiaRepository = SQLiteDataSource.getRepository(Magia)
