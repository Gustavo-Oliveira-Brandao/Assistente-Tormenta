import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './personagem'
import { IPericia } from '../@types/t20/Pericia'

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

  @ManyToOne(() => Personagem, (personagem) => personagem.pericias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
