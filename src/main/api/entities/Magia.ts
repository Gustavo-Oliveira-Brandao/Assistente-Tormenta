import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Personagem } from './Personagem'

@Entity()
export class Grimorio {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 15
  })
  atributoChaveMagias: string

  @Column({ type: 'integer' })
  bonusCD: number

  @OneToMany(() => Magia, (magia) => magia.grimorio, {
    cascade: true,
    eager: true
  })
  magias: Magia[]

  @OneToOne(() => Personagem, (personagem) => personagem.grimorio, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  personagem: Personagem
}

@Entity()
export class Magia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  key: string

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar'
  })
  alvo: string

  @Column({
    type: 'varchar'
  })
  area: string

  @Column({
    type: 'varchar'
  })
  efeito: string

  @Column({
    type: 'varchar'
  })
  execucao: string

  @Column({
    type: 'varchar'
  })
  resistencia: string

  @Column({
    type: 'varchar',
    length: 5000
  })
  descricao: string

  @Column({
    type: 'varchar'
  })
  duracao: string

  @Column({
    type: 'integer'
  })
  nivelCirculo: number

  @Column({
    type: 'varchar'
  })
  alcance: string

  @Column({
    type: 'varchar'
  })
  tradicao: string

  @Column({
    type: 'varchar'
  })
  publicacao: string

  @Column({
    type: 'varchar'
  })
  escola: string

  @OneToMany(() => AprimoramentoMagia, (aprimoramento) => aprimoramento.magia, {
    cascade: true,
    eager: true
  })
  aprimoramentos: AprimoramentoMagia[]

  @ManyToOne(() => Grimorio, (grimorio) => grimorio.magias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  grimorio: Grimorio
}

@Entity()
export class AprimoramentoMagia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  custo: number

  @Column({
    type: 'varchar'
  })
  descricao: string

  @ManyToOne(() => Magia, (magia) => magia.aprimoramentos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  magia: Magia
}
