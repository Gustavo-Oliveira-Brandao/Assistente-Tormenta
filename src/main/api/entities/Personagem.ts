import {
  Column,
  Entity,
  Index,
  JoinColumn,
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
  categoria: string

  @Column({
    type: 'varchar'
  })
  tipo: string

  @Column({
    type: 'integer'
  })
  nivel: number

  @Column({
    type: 'varchar'
  })
  tamanho: string

  @OneToOne(() => DetalhesPJ, (detalhesPJ) => detalhesPJ.personagem, {
    cascade: true
  })
  detalhesPJ: DetalhesPJ

  @OneToOne(() => DetalhesAmeaca, (detalhesAmeaca) => detalhesAmeaca.personagem, {
    cascade: true
  })
  detalhesAmeaca: DetalhesAmeaca

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
  devotoFiel: boolean

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

@Entity()
export class DetalhesPJ {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  raca: string

  @Column({
    type: 'varchar'
  })
  classeOriginal: string

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
  alinhamentoEtico: string

  @Column({
    type: 'varchar'
  })
  alinhamentoMoral: string

  @OneToOne(() => Personagem, (personagem) => personagem.detalhesPJ, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  personagem: Personagem
}

@Entity()
export class DetalhesAmeaca {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  papelCombate: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  subtipo: string

  @Column({
    type: 'varchar'
  })
  tesouro: string

  @OneToOne(() => Personagem, (personagem) => personagem.detalhesAmeaca, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  personagem: Personagem
}
