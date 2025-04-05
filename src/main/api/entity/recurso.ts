import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IRecurso } from '../@types/t20/Recurso'
import { IBonus } from '../@types/t20/Bonus'
import { Bonus } from './bonus'
import { Criatura } from './criatura'

@Entity()
export class Recurso implements IRecurso {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  categoria: string

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
    nullable: true
  })
  limitePM?: number

  @OneToMany(() => Bonus, (bonus) => bonus.recurso, {
    cascade: true,
    eager: true,
    nullable: true
  })
  bonus: IBonus[]

  @ManyToOne(() => Criatura, (criatura) => criatura.recursos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Criatura
}
