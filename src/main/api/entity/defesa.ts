import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Defesa {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer'
  })
  valorAtual: number

  @Column({
    type: 'varchar'
  })
  armaduraEquipada: string

  @Column({
    type: 'varchar'
  })
  escudoEquipado: string

  @Column({
    type: 'varchar'
  })
  atributo: string

  @Column({
    type: 'integer'
  })
  penalidadeArmaduraTotal: number
}
