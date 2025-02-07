import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Vida {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer'
  })
  valorAtual: number

  @Column({
    type: 'integer'
  })
  valorMaximo: number

  @Column({
    type: 'integer'
  })
  valorTemporario: number

  @Column({
    type: 'integer'
  })
  bonusPorNivel: number

  @Column({
    type: 'integer'
  })
  bonusBase: number
}
