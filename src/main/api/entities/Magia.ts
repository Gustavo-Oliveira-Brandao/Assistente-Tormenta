import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AprimoramentoMagia } from './AprimoramentoMagia'
import { Grimorio } from './Grimorio'

@Entity()
export class Magia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 50
  })
  nome: string

  @Column({
    type: 'varchar',
    length: 50
  })
  alvo: string

  @Column({
    type: 'varchar',
    length: 50
  })
  area: string

  @Column({
    type: 'varchar',
    length: 100
  })
  efeito: string

  @Column({
    type: 'varchar',
    length: 30
  })
  execucao: string

  @Column({
    type: 'varchar',
    length: 100
  })
  resistencia: string

  @Column({
    type: 'varchar',
    length: 5000
  })
  descricao: string

  @Column({
    type: 'varchar',
    length: 50
  })
  duracao: string

  @Column({
    type: 'integer'
  })
  nivelCirculo: number

  @Column({
    type: 'varchar',
    length: 50
  })
  alcance: string

  @Column({
    type: 'varchar',
    length: 20
  })
  tradicao: string

  @Column({
    type: 'varchar',
    length: 100
  })
  publicacao: string

  @Column({
    type: 'varchar',
    length: 20
  })
  escola: string

  @OneToMany(() => AprimoramentoMagia, (aprimoramentoMagia) => aprimoramentoMagia.magia, {
    cascade: true,
    nullable: true,
    eager: true
  })
  aprimoramentos?: AprimoramentoMagia[]

  @ManyToOne(() => Grimorio, (grimorio) => grimorio.magias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  grimorio: Grimorio
}
