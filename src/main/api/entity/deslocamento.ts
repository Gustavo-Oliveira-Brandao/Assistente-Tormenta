import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IDeslocamento } from '../@types/t20/Deslocamento'

@Entity()
export class Deslocamento implements IDeslocamento {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer',
    nullable: false
  })
  caminhada: number

  @Column({
    type: 'integer',
    nullable: false
  })
  escalada: number

  @Column({
    type: 'integer',
    nullable: false
  })
  natacao: number

  @Column({
    type: 'integer',
    nullable: false
  })
  voo: number

  @Column({
    type: 'integer',
    nullable: false
  })
  escavacao: number
}
