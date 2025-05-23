import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Classe } from './Classe'
import { Atributo } from './Atributo'
import { Pericia } from './Pericia'
import { Deslocamento } from './Deslocamento'
import { Recurso } from './Recurso'
import { Poder } from './Poder'
import { Proficiencia } from './Proficiencia'
import { Grimorio } from './Grimorio'

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

  @OneToMany(() => Classe, (classes) => classes.personagem, {
    cascade: true
  })
  classes?: Classe[]

  @Column({
    type: 'varchar',
    length: 20
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

  @OneToMany(() => Recurso, (recurso) => recurso.personagem, {
    cascade: true
  })
  recursos: Recurso[]

  @OneToMany(() => Poder, (poder) => poder.personagem, {
    cascade: true,
    nullable: true
  })
  poderes?: Poder[]

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
