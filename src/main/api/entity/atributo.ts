import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './personagem'
import { IAtributo } from '../@types/t20/Atributo'

@Entity()
export class Atributo implements IAtributo {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  nome: string

  @Column({
    type: 'integer',
    nullable: false
  })
  valor: number

  @Column({
    type: 'integer',
    nullable: false
  })
  bonus: number

  @ManyToOne(() => Personagem, (personagem) => personagem.atributos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
