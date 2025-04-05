import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IMagia } from '../@types/t20/Magia'
import { AprimoramentoMagia } from './aprimoramentoMagia'
import { IAprimoramentoMagia } from '../@types/t20/AprimoramentoMagia'
import { Criatura } from './criatura'
import type { ICriatura } from '../@types/t20/Criatura'

@Entity()
export class Magia implements IMagia {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  nome: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  iconeURL: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  alvo: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  area: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  efeito: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  execucao: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  resistencia: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 5000
  })
  descricao: string

  @Column({
    type: 'integer',
    nullable: false
  })
  nivelCirculo: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  alcance: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  tradicao: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  escola: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  duracao: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  publicacao: string

  @OneToMany(() => AprimoramentoMagia, (aprimoramentos) => aprimoramentos.magia, {
    cascade: true,
    eager: true,
    nullable: true
  })
  aprimoramentos: IAprimoramentoMagia[]

  @ManyToOne(() => Criatura, (personagem) => personagem.magias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: ICriatura
}
