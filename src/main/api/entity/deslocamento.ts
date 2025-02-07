import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Deslocamento {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer'
  })
  caminhada: number

  @Column({
    type: 'integer'
  })
  escalada: number

  @Column({
    type: 'integer'
  })
  natacao: number

  @Column({
    type: 'integer'
  })
  voo: number

  @Column({
    type: 'integer'
  })
  escavacao: number
}
