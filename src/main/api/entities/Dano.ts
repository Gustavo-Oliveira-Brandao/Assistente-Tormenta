import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IDano } from '../@types/T20 GOTY/IDano'
import { Bonus } from './Bonus'
import { IBonus } from '../@types/T20 GOTY/IBonus'
import { Magia } from './Magia'

@Entity()
export class Dano implements IDano {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer',
    nullable: false
  })
  quantidade: number

  @Column({
    type: 'integer',
    nullable: false
  })
  dado: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  tipo: string

  @Column({
    type: 'boolean',
    nullable: false
  })
  aplicaModificador: boolean

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  atributo: string

  @OneToMany(() => Bonus, (bonus) => bonus.dano, {
    cascade: true,
    nullable: true
  })
  bonus?: IBonus[]

  @ManyToOne(() => Magia, (magia) => magia.danos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  magia: Magia
}
