import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Extra } from './extra'
import { Tag } from './tag'
import { IPoder } from '../@types/t20/Poder'
import { Criatura } from './criatura'
import type { ICriatura } from '../@types/t20/Criatura'

@Entity()
export class Poder implements IPoder {
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
  tempoExecucao: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1000
  })
  descricao: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  categoria: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  preRequisitos: string

  @OneToMany(() => Extra, (extras) => extras.poder, {
    eager: true,
    cascade: true
  })
  extras: Extra[]

  @OneToMany(() => Tag, (tags) => tags.poder, { cascade: true, eager: true })
  tags: Tag[]

  @ManyToOne(() => Criatura, (personagem) => personagem.poderes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: ICriatura
}
