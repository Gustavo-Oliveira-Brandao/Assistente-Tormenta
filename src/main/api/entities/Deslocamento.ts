import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IDeslocamento } from '../@types/T20 GOTY/IDeslocamento'
import { Bonus } from './Bonus'
import { IBonus } from '../@types/T20 GOTY/IBonus'
import { Personagem } from './Personagem'

@Entity()
export class Deslocamento implements IDeslocamento {
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

  @OneToMany(() => Bonus, (bonus) => bonus.deslocamento, {
    cascade: true,
    nullable: true
  })
  bonus: IBonus[]

  @ManyToOne(() => Personagem, (personagem) => personagem.deslocamentos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
