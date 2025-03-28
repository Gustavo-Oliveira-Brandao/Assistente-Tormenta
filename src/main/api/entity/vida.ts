import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IRecurso } from '../@types/t20/Recurso'
import { IBonus } from '../@types/t20/Bonus'
import { Bonus } from './bonus'

@Entity()
export class Vida implements IRecurso {
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

  @OneToMany(() => Bonus, (bonus) => bonus.vida, {
    cascade: true,
    eager: true,
    nullable: true
  })
  bonus: IBonus[]
}
