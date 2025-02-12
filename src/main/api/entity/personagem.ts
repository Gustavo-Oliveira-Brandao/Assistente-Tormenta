import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Defesa } from './defesa'
import { Vida } from './vida'
import { Mana } from './mana'
import { Deslocamento } from './deslocamento'
import { Atributo } from './atributo'
import { Pericia } from './pericia'
import { Poder } from './poder'
import { IPersonagemT20 } from '../@types/t20/Personagem'

@Entity()
export class Personagem implements IPersonagemT20 {
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
    type: 'varchar',
    nullable: false
  })
  raca: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  classe: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  origem: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  divindade: string

  @Column({
    type: 'integer',
    nullable: false
  })
  nivel: number

  @Column({
    type: 'integer',
    nullable: false
  })
  experiencia: number

  @OneToOne(() => Defesa, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  defesa: Defesa

  @OneToOne(() => Vida, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  vida: Vida

  @OneToOne(() => Mana, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  mana: Mana

  @OneToOne(() => Deslocamento, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  deslocamento: Deslocamento

  @OneToMany(() => Atributo, (atributos) => atributos.personagem, {
    cascade: true,
    eager: true,
    nullable: false
  })
  atributos: Atributo[]

  @OneToMany(() => Pericia, (pericias) => pericias.personagem, {
    cascade: true,
    eager: true,
    nullable: false
  })
  pericias: Pericia[]

  @OneToMany(() => Poder, (poderes) => poderes.personagem, { cascade: true, eager: true })
  poderes: Poder[]
}
