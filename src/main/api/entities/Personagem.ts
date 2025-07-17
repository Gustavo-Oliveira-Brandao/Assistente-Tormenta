import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Atributo } from './Atributo'
import { Pericia } from './Pericia'
import { Deslocamento } from './Deslocamento'
import { Status } from './Status'
import { Proficiencia } from './Proficiencia'
import { ClassePersonagem } from './ClassePersonagem'
import { Poder } from './Poder'
import { Efeito } from './Efeito'
import { Grimorio } from './Magia'

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

  @OneToOne(() => Deslocamento, (deslocamento) => deslocamento.personagem, {
    cascade: true
  })
  deslocamento: Deslocamento

  @OneToMany(() => Efeito, (efeito) => efeito.personagem, {
    cascade: true
  })
  efeitos?: Efeito[]

  @OneToOne(() => Status, (status) => status.personagem, {
    cascade: true
  })
  status: Status

  @OneToMany(() => Proficiencia, (proficiencia) => proficiencia.personagem, {
    cascade: true
  })
  proficiencias?: Proficiencia[]

  @OneToOne(() => Grimorio, (grimorio) => grimorio.personagem, {
    cascade: true
  })
  grimorio?: Grimorio
}
