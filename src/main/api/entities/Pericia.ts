import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IPericia } from '../@types/T20 GOTY/IPericia'
import { Bonus } from './Bonus'
import { IBonus } from '../@types/T20 GOTY/IBonus'
import { Personagem } from './Personagem'

@Entity()
export class Pericia implements IPericia {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  nome: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 15
  })
  treinamento: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
  })
  categoria: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20
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
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  bonus: IBonus[]

  @ManyToOne(() => Personagem, (personagem) => personagem.pericias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
