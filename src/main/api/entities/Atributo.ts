import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IAtributo } from '../@types/T20 GOTY/IAtributo'
import { Bonus } from './Bonus'
import { IBonus } from '../@types/T20 GOTY/IBonus'
import { Personagem } from './Personagem'

@Entity()
export class Atributo implements IAtributo {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  nome: string

  @Column({
    type: 'integer',
    nullable: false
  })
  valorBase: number

  @Column({
    type: 'integer',
    nullable: false
  })
  ordem: number

  @OneToMany(() => Bonus, (bonus) => bonus.atributo, {
    cascade: true,
    nullable: true
  })
  bonus: IBonus[]

  @ManyToOne(() => Personagem, (personagem) => personagem.atributos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
