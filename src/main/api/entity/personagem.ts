import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Vida } from './vida'
import { Mana } from './mana'
import { Deslocamento } from './deslocamento'
import { Atributo } from './atributo'
import { Pericia } from './pericia'
import { Poder } from './poder'
import { IPersonagem } from '../@types/t20/Personagem'
import { Defesa } from './defesa'
import { ItemT20 } from './item'

@Entity()
export class Personagem implements IPersonagem {
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
  raca: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  classe: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  origem: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  divindade: string

  @Column({
    type: 'integer',
    nullable: false
  })
  nivel: number

  @Column({
    type: 'integer',
    nullable: false
  })
  experiencia: number

  @OneToOne(() => Defesa, {
    cascade: true,
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  defesa: Defesa

  @OneToOne(() => Vida, {
    cascade: true,
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  vida: Vida

  @OneToOne(() => Mana, {
    cascade: true,
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  mana: Mana

  @OneToOne(() => Deslocamento, {
    cascade: true,
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  deslocamento: Deslocamento

  @OneToMany(() => Atributo, (atributos) => atributos.personagem, {
    cascade: true,
    eager: true,
    nullable: false
  })
  atributos: Atributo[]

  @OneToMany(() => Pericia, (pericias) => pericias.personagem, {
    cascade: true,
    eager: true,
    nullable: false
  })
  pericias: Pericia[]

  @OneToMany(() => Poder, (poderes) => poderes.personagem, {
    cascade: true,
    eager: true
  })
  poderes: Poder[]

  @OneToMany(() => ItemT20, (itens) => itens.personagem, {
    cascade: true,
    eager: true
  })
  itens: ItemT20[]
}
