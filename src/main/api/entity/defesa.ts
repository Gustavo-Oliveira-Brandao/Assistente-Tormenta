import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IDefesa } from '../@types/t20/Defesa'

@Entity()
export class Defesa implements IDefesa {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    type: 'varchar'
  })
  armaduraEquipada: string

  @Column({
    nullable: false,
    type: 'varchar'
  })
  escudoEquipado: string

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
}
