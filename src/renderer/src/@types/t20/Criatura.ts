import { IAtributo } from './Atributo'
import { IMagia } from './Magia'
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
  penalidadeArmadura: number
  recursos: IRecurso[]
  atributos: IAtributo[]
  pericias: IPericia[]
  poderes: IPoder[]
  magias: IMagia[]
}
