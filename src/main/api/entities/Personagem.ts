import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Atributo } from './Atributo'
import { Pericia } from './Pericia'
import { Deslocamento } from './Deslocamento'
import { Status } from './Status'
import { Proficiencia } from './Proficiencia'
import { Poder } from './Poder'
import { Efeito } from './Efeito'
import { Grimorio } from './Magia'

@Entity()
export class Personagem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar'
  })
  tipo: string

  @Column({
    type: 'varchar'
  })
  raca: string

  @Column({
    type: 'varchar'
  })
  classeInicial: string

  @Column({
    type: 'varchar'
  })
  origem: string

  @Column({
    type: 'varchar'
  })
  divindade: string

  @Column({
    type: 'integer'
  })
  experiencia: number

  @Column({
    type: 'varchar'
  })
  tamanho: string

  @Column({
    type: 'varchar'
  })
  alinhamentoEtico: string

  @Column({
    type: 'varchar'
  })
  alinhamentoMoral: string

  @OneToMany(() => Poder, (poder) => poder.personagem, {
    cascade: true
  })
  poderes: Poder[]

  @OneToMany(() => Classe, (classes) => classes.personagem, {
    cascade: true
  })
  classes: Classe[]

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
  efeitos: Efeito[]

  @OneToOne(() => Status, (status) => status.personagem, {
    cascade: true
  })
  status: Status

  @OneToMany(() => Proficiencia, (proficiencia) => proficiencia.personagem, {
    cascade: true
  })
  proficiencias: Proficiencia[]

  @OneToOne(() => Grimorio, (grimorio) => grimorio.personagem, {
    cascade: true
  })
  grimorio: Grimorio
}

@Entity()
export class Classe {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'integer'
  })
  nivel: number

  @Column({
    type: 'integer'
  })
  vidaInicial: number

  @Column({
    type: 'integer'
  })
  vidaPorNivel: number

  @Column({
    type: 'boolean'
  })
  devotoFiel: true

  @Column({
    type: 'integer'
  })
  manaPorNivel: number

  @ManyToOne(() => Personagem, (personagem) => personagem.classes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  personagem: Personagem
}
