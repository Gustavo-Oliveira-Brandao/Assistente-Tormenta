import { DataSource } from 'typeorm'
import { Atributo } from './entities/Atributo'
import { Dano } from './entities/Dano'
import { Deslocamento } from './entities/Deslocamento'
import { Pericia } from './entities/Pericia'
import { Personagem } from './entities/Personagem'
import { Proficiencia } from './entities/Proficiencia'
import { ClassePersonagem } from './entities/ClassePersonagem'
import { Poder, SubEfeito, Tag } from './entities/Poder'
import { AprimoramentoMagia, Grimorio, Magia } from './entities/Magia'
import { Modificador } from './entities/Modificador'
import { Status } from './entities/Status'
import { Efeito } from './entities/Efeito'
import {
  Armadura,
  Ataque,
  Equipamento,
  Inventario,
  Propriedade,
  Resistencia
} from './entities/Inventario'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/UserData/db.sqlite',
  synchronize: true,
  entities: [
    Atributo,
    Dano,
    ClassePersonagem,
    Poder,
    Tag,
    Modificador,
    SubEfeito,
    Efeito,
    Deslocamento,
    Grimorio,
    Equipamento,
    Inventario,
    Propriedade,
    Ataque,
    Resistencia,
    Armadura,
    Magia,
    Pericia,
    AprimoramentoMagia,
    Personagem,
    Proficiencia,
    Status
  ]
})
