import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IDefesa } from '../@types/t20/Defesa'
import { Bonus } from './bonus'
import { IBonus } from '../@types/t20/Bonus'

@Entity()
export class Defesa implements IDefesa {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    type: 'integer'
  })
  armadura: number

  @Column({
    nullable: false,
    type: 'integer'
  })
  escudo: number

  @Column({
    nullable: false,
    type: 'integer'
  })
  temporario: number

  @Column({
    nullable: false,
    type: 'varchar'
  })
  atributo: string

  @Column({
    nullable: false,
    type: 'integer'
  })
  penalidadeArmaduraTotal: number

  @OneToMany(() => Bonus, (bonus) => bonus.defesa, {
    cascade: true,
    eager: true,
    nullable: true
  })
  bonus: IBonus[]
}
