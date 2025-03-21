import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IPericia } from '../@types/t20/Pericia'
import { Bonus } from './bonus'
import { IBonus } from '../@types/t20/Bonus'
import { Criatura } from './criatura'
import type { ICriatura } from '../@types/t20/Criatura'

@Entity()
export class Pericia implements IPericia {
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
  treinamento: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  categoria: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  atributo: string

  @Column({
    type: 'boolean',
    nullable: false
  })
  requerTreinamento: boolean

  @Column({
    type: 'boolean',
    nullable: false
  })
  sofrePenalidadeArmadura: boolean

  @OneToMany(() => Bonus, (bonus) => bonus.pericia, {
    cascade: true,
    eager: true,
    nullable: true
  })
  bonus: IBonus[]

  @ManyToOne(() => Criatura, (personagem) => personagem.pericias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: ICriatura
}
