import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IItemInventario } from '../@types/t20/Item'
import { Dano } from './dano'
import { Criatura } from './criatura'
import type { ICriatura } from '../@types/t20/Criatura'

@Entity()
export class ItemT20 implements IItemInventario {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    nullable: false,
    type: 'varchar'
  })
  nome: string

  @Column({
    nullable: false,
    type: 'integer'
  })
  preco: number

  @Column({
    nullable: false,
    type: 'varchar'
  })
  categoria: string

  @Column({
    nullable: false,
    type: 'varchar'
  })
  subCategoria: string

  @Column({
    nullable: false,
    type: 'varchar',
    length: 2000
  })
  descricao: string

  @Column({
    nullable: false,
    type: 'integer'
  })
  espacos: number

  @Column({
    nullable: false,
    type: 'integer'
  })
  quantidade: number

  @Column({
    type: 'integer',
    nullable: true
  })
  margemCritico?: number

  @Column({
    type: 'integer',
    nullable: true
  })
  multiplicadorCritico?: number

  @Column({
    type: 'varchar',
    nullable: true
  })
  alcance?: string

  @Column({
    type: 'integer',
    nullable: true
  })
  bonusDefesa?: number

  @Column({
    type: 'integer',
    nullable: true
  })
  penalidadeArmadura?: number

  @OneToMany(() => Dano, (danos) => danos.item, {
    cascade: true,
    eager: true,
    nullable: true
  })
  danos: Dano[]

  @ManyToOne(() => Criatura, (personagem) => personagem.itens, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: ICriatura
}
