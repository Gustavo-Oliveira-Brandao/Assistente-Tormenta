import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Defesa } from './defesa'
import { Vida } from './vida'
import { Mana } from './mana'
import { Deslocamento } from './deslocamento'
import { Atributo } from './atributo'
import { Pericia } from './pericia'
import { Poder } from './poder'

@Entity()
export class Personagem {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar'
  })
  classe: string

  @Column({
    type: 'varchar'
  })
  origem: string

  @Column({
    type: 'varchar'
  })
  divindade: string

  @Column({
    type: 'integer'
  })
  nivel: number

  @Column({
    type: 'integer'
  })
  experiencia: number

  @OneToOne(() => Defesa)
  @JoinColumn()
  defesa: Defesa

  @OneToOne(() => Vida)
  @JoinColumn()
  vida: Vida

  @OneToOne(() => Mana)
  @JoinColumn()
  mana: Mana

  @OneToOne(() => Deslocamento)
  @JoinColumn()
  deslocamento: Deslocamento

  @OneToMany(() => Atributo, (atributos) => atributos.personagem)
  atributos: Atributo[]

  @OneToMany(() => Pericia, (pericias) => pericias.personagem)
  pericias: Pericia[]

  @OneToMany(() => Poder, (poderes) => poderes.personagem)
  poderes: Poder[]
}
