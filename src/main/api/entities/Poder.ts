import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IPoder } from '../@types/T20 GOTY/IPoder'
import { SubEfeito } from './SubEfeito'
import { ISubEfeito } from '../@types/T20 GOTY/ISubEfeito'
import { Tag } from './Tag'
import { ITag } from '../@types/T20 GOTY/ITag'
import { Progressao } from './Progressao'
import { Classe } from './Classe'
import { Personagem } from './Personagem'

@Entity()
export class Poder implements IPoder {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  nome: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  iconeURL: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  tempoExecucao: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 5000
  })
  descricao: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  categoria: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255
  })
  preRequisitos: string

  @OneToMany(() => SubEfeito, (subEfeito) => subEfeito.poder, {
    cascade: true,
    nullable: true
  })
  subEfeitos: ISubEfeito[]

  @OneToMany(() => Tag, (tags) => tags.poder, {
    cascade: true,
    nullable: false
  })
  tags: ITag[]

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
