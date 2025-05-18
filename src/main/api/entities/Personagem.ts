import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IPersonagem } from '../@types/T20 GOTY/IPersonagem'
import { Classe } from './Classe'
import { IClasse } from '../@types/T20 GOTY/IClasse'
import { Atributo } from './Atributo'
import { IAtributo } from '../@types/T20 GOTY/IAtributo'
import { Pericia } from './Pericia'
import { IPericia } from '../@types/T20 GOTY/IPericia'
import { Deslocamento } from './Deslocamento'
import { IDeslocamento } from '../@types/T20 GOTY/IDeslocamento'
import { Recurso } from './Recurso'
import { IRecurso } from '../@types/T20 GOTY/IRecurso'
import { Poder } from './Poder'
import { IPoder } from '../@types/T20 GOTY/IPoder'
import { Proficiencia } from './Proficiencia'
import { IProficiencia } from '../@types/T20 GOTY/IProficiencia'

@Entity()
export class Personagem implements IPersonagem {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 150
  })
  nome: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  tipo: string

  @Column({
    type: 'integer',
    nullable: false
  })
  idade: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 10
  })
  altura: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  peso: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  raca: string

  @OneToMany(() => Classe, (classes) => classes.personagem, {
    cascade: true,
    nullable: false
  })
  classes: IClasse[]

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  origem: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 30
  })
  divindade: string

  @Column({
    type: 'integer',
    nullable: false
  })
  experiencia: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  tamanho: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 10
  })
  alinhamentoEtico: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 10
  })
  alinhamentoMoral: string

  @OneToMany(() => Atributo, (atributos) => atributos.personagem, {
    cascade: true,
    nullable: false
  })
  atributos: IAtributo[]

  @OneToMany(() => Pericia, (pericia) => pericia.personagem, {
    cascade: true,
    nullable: false
  })
  pericias: IPericia[]

  @OneToMany(() => Deslocamento, (deslocamento) => deslocamento.personagem, {
    cascade: true,
    nullable: false
  })
  deslocamentos: IDeslocamento[]

  @OneToMany(() => Recurso, (recurso) => recurso.personagem, {
    cascade: true,
    nullable: false
  })
  recursos: IRecurso[]

  @OneToMany(() => Poder, (poder) => poder.personagem, {
    cascade: true,
    nullable: true
  })
  poderes?: IPoder[]

  @OneToMany(() => Proficiencia, (proficiencia) => proficiencia.personagem, {
    cascade: true,
    nullable: true
  })
  proficiencias?: IProficiencia[]
}
