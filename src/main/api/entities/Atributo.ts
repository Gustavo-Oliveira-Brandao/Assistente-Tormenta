import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
export class Atributo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'integer',
    nullable: false
  })
  valorBase: number

  @Column({
    type: 'integer',
    nullable: false
  })
  bonus: number

  @ManyToOne(() => Personagem, (personagem) => personagem.atributos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  personagem: Personagem
}
