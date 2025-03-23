import { SQLiteDataSource } from '../data-source'
import { Deslocamento } from '../entity/deslocamento'

export const deslocamentoRepository = SQLiteDataSource.getRepository(Deslocamento)
