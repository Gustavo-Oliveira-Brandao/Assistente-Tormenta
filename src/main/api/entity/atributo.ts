import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './personagem'

@Entity()
export class Atributo {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'integer'
  })
  valorAtual: number

  @Column({
    type: 'integer'
  })
  valorBase: number

  @Column({
    type: 'varchar'
  })
  descricao: string

  @ManyToOne(() => Personagem, (personagem) => personagem.atributos)
  personagem: Personagem
}
