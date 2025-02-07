import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Topico } from './topico'
import { Tag } from './tag'
import { Personagem } from './personagem'

@Entity()
export class Poder {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar'
  })
  iconeURL: string

  @Column({
    type: 'varchar'
  })
  tempoExecucao: string

  @Column({
    type: 'varchar'
  })
  descricao: string

  @Column({
    type: 'varchar'
  })
  categoria: string

  @Column({
    type: 'varchar'
  })
  preRequisitos: string

  @OneToMany(() => Topico, (topicos) => topicos.poder)
  topicos: Topico[]

  @OneToMany(() => Tag, (tags) => tags.poder)
  tags: Tag[]

  @ManyToOne(() => Personagem, (personagem) => personagem.poderes)
  personagem: Personagem
}
