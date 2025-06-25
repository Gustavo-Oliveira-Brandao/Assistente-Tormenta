import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Atributo } from './Atributo'
import { Pericia } from './Pericia'
import { Deslocamento } from './Deslocamento'
import { Recurso } from './Recurso'
import { Proficiencia } from './Proficiencia'
import { Grimorio } from './Grimorio'
import { ClassePersonagem } from './ClassePersonagem'
import { Poder } from './Poder'
import { Modificador } from './Modificador'

@Entity()
export class Personagem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 150
  })
  nome: string

  @Column({
    type: 'varchar',
    length: 20
  })
  tipo: string

  @Column({
    type: 'integer',
    nullable: true
  })
  idade?: number

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true
  })
  altura?: string

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  peso?: string

  @Column({
    type: 'varchar',
    length: 20
  })
  raca: string

  @Column({
    type: 'varchar'
  })
  classeInicial: string

  @Column({
    type: 'varchar',
    length: 30
  })
  origem: string

  @Column({
    type: 'varchar',
    length: 30
  })
  divindade: string

  @Column({
    type: 'integer'
  })
  experiencia: number

  @Column({
    type: 'varchar',
    length: 20
  })
  tamanho: string

  @Column({
    type: 'varchar',
    length: 10
  })
  alinhamentoEtico: string

  @Column({
    type: 'varchar',
    length: 10
  })
  alinhamentoMoral: string

  @OneToMany(() => Poder, (poder) => poder.personagem, {
    cascade: true
  })
  poderes: Poder[]

  @OneToMany(() => ClassePersonagem, (classes) => classes.personagem, {
    cascade: true
  })
  classes: ClassePersonagem[]

  @OneToMany(() => Atributo, (atributos) => atributos.personagem, {
    cascade: true
  })
  atributos: Atributo[]

  @OneToMany(() => Pericia, (pericia) => pericia.personagem, {
    cascade: true
  })
  pericias: Pericia[]

  @OneToMany(() => Deslocamento, (deslocamento) => deslocamento.personagem, {
    cascade: true
  })
  deslocamentos: Deslocamento[]

  @OneToMany(() => Modificador, (modificador) => modificador.personagem, {
    cascade: true,
    nullable: true
  })
  modificadores?: Modificador[]

  @OneToMany(() => Recurso, (recurso) => recurso.personagem, {
    cascade: true
  })
  recursos: Recurso[]

  @OneToMany(() => Proficiencia, (proficiencia) => proficiencia.personagem, {
    cascade: true,
    nullable: true
  })
  proficiencias?: Proficiencia[]

  @OneToMany(() => Grimorio, (grimorio) => grimorio.personagem, {
    cascade: true,
    nullable: true
  })
  grimorios?: Grimorio[]
}
