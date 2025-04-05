import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IDano } from '../@types/t20/Dano'
import { ItemT20 } from './item'
import { Bonus } from './bonus'
import { IBonus } from '../@types/t20/Bonus'

@Entity()
export class Dano implements IDano {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    nullable: false,
    type: 'integer'
  })
  quantidade: number

  @Column({
    nullable: false,
    type: 'integer'
  })
  dado: number

  @Column({
    nullable: false,
    type: 'varchar'
  })
  tipo: string

  @Column({
    nullable: false,
    type: 'varchar'
  })
  atributo: string

  @OneToMany(() => Bonus, (bonus) => bonus.dano, {
    cascade: true,
    eager: true,
    nullable: true
  })
  bonus: IBonus[]

  @ManyToOne(() => ItemT20, (item) => item.danos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  item: ItemT20
}
