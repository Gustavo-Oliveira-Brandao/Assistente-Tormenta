import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

//OK
@Entity()
export class Rolagem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  quantidade: number

  @Column({
    type: 'integer'
  })
  dado: number

  @Column({
    type: 'varchar'
  })
  tipo: string

  @Column({
    type: 'varchar'
  })
  descricao: string

  @Column({
    type: 'integer'
  })
  bonus: number
}
