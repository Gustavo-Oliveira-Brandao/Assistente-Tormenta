import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
export class Poder {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  key: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  icone?: string

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar'
  })
  tempoExecucao: string

  @Column({
    type: 'varchar',
    length: 5000
  })
  descricao: string

  @Column({
    type: 'varchar'
  })
  categoria: string

  @Column({
    type: 'integer'
  })
  nivel: number

  @Column({
    type: 'varchar'
  })
  preRequisitos: string

  @Column({
    type: 'varchar'
  })
  publicacao: string

  @Column({
    type: 'varchar'
  })
  fonte: string

  @OneToMany(() => SubEfeito, (subEfeito) => subEfeito.poder, {
    cascade: true,
    eager: true
  })
  subEfeitos: SubEfeito[]

  @OneToMany(() => Tag, (tag) => tag.poder, {
    cascade: true,
    eager: true
  })
  tags: Tag[]

  @ManyToOne(() => Personagem, (personagem) => personagem.poderes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}

@Entity()
export class SubEfeito {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar'
  })
  descricao: string

  @ManyToOne(() => Poder, (poder) => poder.subEfeitos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  poder: Poder
}

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  label: string

  @ManyToOne(() => Poder, (poder) => poder.tags, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  poder: Poder
}
