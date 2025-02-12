import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Topico } from './topico'
import { Tag } from './tag'
import { Personagem } from './personagem'
import { IPoder } from '../@types/t20/Poder'

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
    nullable: false
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

  @OneToMany(() => Topico, (topicos) => topicos.poder, { eager: true, cascade: true })
  topicos: Topico[]

  @OneToMany(() => Tag, (tags) => tags.poder, { cascade: true, eager: true })
  tags: Tag[]

  @ManyToOne(() => Personagem, (personagem) => personagem.poderes)
  personagem: Personagem
}
