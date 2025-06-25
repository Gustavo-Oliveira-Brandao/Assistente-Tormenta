import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
@Index(['personagem', 'id', 'nome', 'valorBase'])
export class Deslocamento {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 20
  })
  nome: string

  @Column({
    type: 'integer'
  })
  valorBase: number

  @ManyToOne(() => Personagem, (personagem) => personagem.deslocamentos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
