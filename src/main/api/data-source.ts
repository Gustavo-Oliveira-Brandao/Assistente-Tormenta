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
import { Defesa } from './entity/defesa'
import { ItemT20 } from './entity/item'
import { Dano } from './entity/dano'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/userData/db.sqlite',
  logging: true,
  entities: [
    Personagem,
    Deslocamento,
    Defesa,
    Vida,
    Mana,
    Atributo,
    Pericia,
    Poder,
    Topico,
    Tag,
    ItemT20,
    Dano
  ],
  synchronize: true
})
