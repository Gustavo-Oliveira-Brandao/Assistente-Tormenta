import { DataSource } from 'typeorm'
import { Atributo } from './entity/atributo'
import { Deslocamento } from './entity/deslocamento'
import { Mana } from './entity/mana'
import { Pericia } from './entity/pericia'
import { Criatura } from './entity/criatura'
import { Poder } from './entity/poder'
import { Tag } from './entity/tag'
import { Extra } from './entity/topico'
import { Vida } from './entity/vida'
import { Defesa } from './entity/defesa'
import { ItemT20 } from './entity/item'
import { Dano } from './entity/dano'
import { Magia } from './entity/magia'
import { AprimoramentoMagia } from './entity/aprimoramentoMagia'
import { Bonus } from './entity/bonus'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/userData/db.sqlite',
  entities: [
    Criatura,
    Deslocamento,
    Defesa,
    Vida,
    Mana,
    Atributo,
    Pericia,
    Poder,
    Extra,
    Tag,
    ItemT20,
    Dano,
    Magia,
    AprimoramentoMagia,
    Bonus
  ],
  synchronize: true
})
