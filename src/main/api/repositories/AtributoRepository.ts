import { SQLiteDataSource } from '../data-source'
import { Atributo } from '../entity/atributo'

export const atributoRepository = SQLiteDataSource.getRepository(Atributo)
