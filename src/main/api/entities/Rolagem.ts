import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Equipamento } from './Inventario'

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

  @Column({
    type: 'varchar'
  })
    atributo: string

  @ManyToOne(() => (Equipamento), (equipamento) => equipamento.rolagens, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  equipamento: Equipamento
}
