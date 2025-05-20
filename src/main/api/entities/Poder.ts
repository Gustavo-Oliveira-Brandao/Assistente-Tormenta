import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { SubEfeito } from './SubEfeito'
import { Tag } from './Tag'
import { Progressao } from './Progressao'
import { Classe } from './Classe'
import { Personagem } from './Personagem'

@Entity()
export class Poder {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  nome: string

  @Column({
    type: 'varchar',
    length: 50
  })
  tempoExecucao: string

  @Column({
    type: 'varchar',
    length: 5000
  })
  descricao: string

  @Column({
    type: 'varchar',
    length: 20
  })
  categoria: string

  @Column({
    type: 'varchar',
    length: 255
  })
  preRequisitos: string

  @OneToMany(() => SubEfeito, (subEfeito) => subEfeito.poder, {
    cascade: true,
    nullable: true,
    eager: true
  })
  subEfeitos: SubEfeito[]

  @OneToMany(() => Tag, (tags) => tags.poder, {
    cascade: true,
    eager: true
  })
  tags: Tag[]

  @ManyToOne(() => Progressao, (progressao) => progressao.poderes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  progressao: Progressao

  @ManyToOne(() => Classe, (classe) => classe.poderesClasse, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  classe: Classe

  @ManyToOne(() => Personagem, (personagem) => personagem.poderes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
