import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IGrimorio } from '../@types/T20 GOTY/IGrimorio'
import { Bonus } from './Bonus'
import { IBonus } from '../@types/T20 GOTY/IBonus'

@Entity()
export class Grimorio implements IGrimorio {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  tradicao: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  atributoChave: string

  @OneToMany(() => Bonus, (bonus) => bonus.grimorio, {
    cascade: true,
    nullable: true
  })
  bonusCD?: IBonus[]
}
