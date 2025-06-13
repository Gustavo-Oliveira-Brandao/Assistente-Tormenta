import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
export class PoderRef {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  key: number

  @Column({
    type: 'integer'
  })
  nivel: number

  @ManyToOne(() => Personagem, (personagem) => personagem.poderes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
