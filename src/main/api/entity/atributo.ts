import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Criatura } from './criatura'
import { IAtributo } from '../@types/t20/Atributo'
import { Bonus } from './bonus'
import { IBonus } from '../@types/t20/Bonus'
import type { ICriatura } from '../@types/t20/Criatura'

@Entity()
export class Atributo implements IAtributo {
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
    type: 'integer',
    nullable: false
  })
  valor: number

  @Column({
    type: 'integer',
    nullable: false
  })
  ordem: number

  @OneToMany(() => Bonus, (bonus) => bonus.atributo, {
    cascade: true,
    eager: true,
    nullable: true
  })
  bonus: IBonus[]

  @ManyToOne(() => Criatura, (personagem) => personagem.atributos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: ICriatura
}
