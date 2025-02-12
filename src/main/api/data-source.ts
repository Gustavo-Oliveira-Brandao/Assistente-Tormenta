import { DataSource } from 'typeorm'
import { Atributo } from './entity/atributo'
import { Deslocamento } from './entity/deslocamento'
import { Mana } from './entity/mana'
import { Pericia } from './entity/pericia'
import { Personagem } from './entity/personagem'
import { Poder } from './entity/poder'
import { Tag } from './entity/tag'
import { Topico } from './entity/topico'
import { Vida } from './entity/vida'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/userData/db.sqlite',
  logging: true,
  entities: [Personagem, Deslocamento, Vida, Mana, Atributo, Pericia, Poder, Topico, Tag],
  synchronize: true
})
