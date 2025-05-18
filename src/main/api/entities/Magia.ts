import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IMagia } from '../@types/T20 GOTY/IMagia'
import { AprimoramentoMagia } from './AprimoramentoMagia'
import { IAprimoramentoMagia } from '../@types/T20 GOTY/IAprimoramentoMagia'
import { Dano } from './Dano'
import { IDano } from '../@types/T20 GOTY/IDano'

@Entity()
export class Magia implements IMagia {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  nome: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  alvo: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  area: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  efeito: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 30
  })
  execucao: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  resistencia: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 5000
  })
  descricao: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  duracao: string

  @Column({
    type: 'integer',
    nullable: false
  })
  nivelCirculo: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  alcance: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  tradicao: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  publicacao: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  escola: string

  @OneToMany(() => AprimoramentoMagia, (aprimoramentoMagia) => aprimoramentoMagia.magia, {
    cascade: true,
    nullable: true
  })
  aprimoramentos?: IAprimoramentoMagia[]

  @OneToMany(() => Dano, (dano) => dano.magia, {
    cascade: true,
    nullable: true
  })
  danos?: IDano[]
}
