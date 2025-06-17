import { DataSource } from 'typeorm'
import { Atributo } from './entities/Atributo'
import { Bonus } from './entities/Bonus'
import { Dano } from './entities/Dano'
import { Deslocamento } from './entities/Deslocamento'
import { Grimorio } from './entities/Grimorio'
import { Pericia } from './entities/Pericia'
import { Personagem } from './entities/Personagem'
import { Proficiencia } from './entities/Proficiencia'
import { Recurso } from './entities/Recurso'
import { ClassePersonagem } from './entities/ClassePersonagem'
import { Poder, SubEfeito, Tag } from './entities/Poder'
import { AprimoramentoMagia, Magia } from './entities/Magia'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/UserData/db.sqlite',
  synchronize: true,
  entities: [
    Atributo,
    Bonus,
    Dano,
    ClassePersonagem,
    Poder,
    Tag,
    SubEfeito,
    Deslocamento,
    Grimorio,
    Magia,
    Pericia,
    AprimoramentoMagia,
    Personagem,
    Proficiencia,
    Recurso
  ]
})
