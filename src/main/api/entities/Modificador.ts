import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Efeito } from './Efeito'
@Entity()
export class Modificador {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  tipo: string

  @Column({
    type: 'varchar'
  })
  alvo: string

  @Column({
    type: 'varchar'
  })
  modoBonus: 'SOMA' | 'SUBSTITUICAO'

  @Column({
    type: 'integer'
  })
  valor: number

  @Column({
    type: 'boolean'
  })
  estaAtivo: boolean

  @Column({
    type: 'boolean'
  })
  ehPorNivel: boolean

  @ManyToOne(() => Efeito, (efeito) => efeito.modificadores, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  efeito: Efeito
}
