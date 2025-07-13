import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
export class Atributo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 20
  })
  nome: string

  @Column({
    type: 'varchar'
  })
  key: string

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

  @Column({
    type: 'integer',
    nullable: false
  })
  ordem: number

  @ManyToOne(() => Personagem, (personagem) => personagem.atributos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  personagem: Personagem
}
