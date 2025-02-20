import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IDano } from '../@types/t20/Dano'
import { ItemT20 } from './item'

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
    type: 'boolean'
  })
  aplicaModificador: boolean

  @Column({
    nullable: false,
    type: 'varchar'
  })
  atributo: string

  @ManyToOne(() => ItemT20, (item) => item.danos)
  item: ItemT20
}
