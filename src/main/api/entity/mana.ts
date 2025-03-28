import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IRecurso } from '../@types/t20/Recurso'
import { IBonus } from '../@types/t20/Bonus'
import { Bonus } from './bonus'

@Entity()
export class Mana implements IRecurso {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer',
    nullable: false
  })
  valorAtual: number

  @Column({
    type: 'integer',
    nullable: false
  })
  valorTemporario: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  atributo: string

  @Column({
    type: 'integer',
    nullable: false
  })
  limitePM?: number

  @OneToMany(() => Bonus, (bonus) => bonus.mana, {
    cascade: true,
    eager: true,
    nullable: true
  })
  bonus: IBonus[]
}
