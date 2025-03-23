import { IDefesa } from './Defesa'
import { IRecurso } from './Recurso'
import { IDeslocamento } from './Deslocamento'
import { IAtributo } from './Atributo'
import { IPericia } from './Pericia'
import { IPoder } from './Poder'
import { IItemInventario } from './Item'
import { IMagia } from './Magia'

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
  alinhamento?: string
  defesa: IDefesa
  vida: IRecurso
  mana: IRecurso
  deslocamento: IDeslocamento
  atributos: IAtributo[]
  pericias: IPericia[]
  poderes?: IPoder[]
  itens?: IItemInventario[]
  magias?: IMagia[]
}
