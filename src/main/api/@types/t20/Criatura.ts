import { IRecurso } from './Recurso'
import { IAtributo } from './Atributo'
import { IPericia } from './Pericia'

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
  penalidadeArmadura?: number
  recursos: IRecurso[]
  atributos: IAtributo[]
  pericias: IPericia[]
}
