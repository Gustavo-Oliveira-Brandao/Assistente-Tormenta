import { IAtributo } from './Atributo'
import { IDeslocamento } from './Deslocamento'
import { IPericia } from './Pericia'
import { IPoder } from './Poder'
import { IRecurso } from './Recurso'

export interface IPersonagemT20 {
  id: number
  nome: string
  raca: string
  classe: string
  origem: string
  divindade: string
  nivel: number
  experiencia: number
  valorDefesa: number
  valorPenalidadeArmadura: number
  vida: IRecurso
  mana: IRecurso
  deslocamento: IDeslocamento
  atributos: IAtributo[]
  pericias: IPericia[]
  poderes: IPoder[]
}
