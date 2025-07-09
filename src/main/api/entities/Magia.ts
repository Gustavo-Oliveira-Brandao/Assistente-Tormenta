import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

@Entity()
export class Magia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  key: number

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

  @ManyToOne(() => Personagem, (personagem) => personagem.magias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
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
