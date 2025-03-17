import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IMagia } from '../@types/t20/Magia'
import { Personagem } from './personagem'
import { AprimoramentoMagia } from './aprimoramentoMagia'
import { IAprimoramentoMagia } from '../@types/t20/AprimoramentoMagia'
import { Dano } from './dano'
import { IDano } from '../@types/t20/Dano'

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
  alvoAreaEfeito: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  execucao: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  testeResistencia: string

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

  @OneToMany(() => Dano, (danos) => danos.magia, {
    cascade: true,
    eager: true,
    nullable: true
  })
  danos: IDano[]

  @OneToMany(() => AprimoramentoMagia, (aprimoramentos) => aprimoramentos.magia, {
    cascade: true,
    eager: true,
    nullable: true
  })
  aprimoramentos: IAprimoramentoMagia[]

  @ManyToOne(() => Personagem, (personagem) => personagem.magias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
