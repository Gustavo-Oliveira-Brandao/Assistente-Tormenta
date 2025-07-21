import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
export class Deslocamento {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  caminhadaBase: number

  @Column({
    type: 'integer'
  })
  vooBase: number

  @Column({
    type: 'integer'
  })
  natacaoBase: number

  @Column({
    type: 'integer'
  })
  escaladaBase: number

  @Column({
    type: 'integer'
  })
  escavacaoBase: number

  @Column({
    type: 'boolean'
  })
  plana: boolean

  @OneToOne(() => Personagem, (personagem) => personagem.deslocamento, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  personagem: Personagem
}
