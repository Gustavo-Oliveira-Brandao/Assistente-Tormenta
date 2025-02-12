import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IDefesa } from '../@types/t20/Defesa'

@Entity()
export class Defesa implements IDefesa {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  armaduraEquipada: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  escudoEquipado: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  atributo: string

  @Column({
    type: 'integer',
    nullable: false
  })
  penalidadeArmaduraTotal: number
}
