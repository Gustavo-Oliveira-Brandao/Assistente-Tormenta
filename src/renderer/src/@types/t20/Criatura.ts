import { IAtributo } from './Atributo'
import { IDefesa } from './Defesa'
import { IDeslocamento } from './Deslocamento'
import { IPericia } from './Pericia'
import { IPoder } from './Poder'
import { IRecurso } from './Recurso'

export interface ICriatura {
  id: number
  nome: string
  tipoCriatura: string
  categoria: string
  raca: string
  classe?: string
  origem?: string
  divindade?: string
  nivel: number
  experiencia?: number
  tamanho: string
  alinhamento: string
  defesa: IDefesa
  vida: IRecurso
  mana: IRecurso
  deslocamento: IDeslocamento
  atributos: IAtributo[]
  pericias: IPericia[]
  poderes: IPoder[]
}
