import { IAtributo } from './Atributo'
import { IPericia } from './Pericia'
import { IRecurso } from './Recurso'

export interface ICriatura {
  id: number
  nome: string
  tipoCriatura: string
  categoria: string
  idade: number
  altura: string
  peso: string
  raca: string
  classe?: string
  origem?: string
  divindade?: string
  nivel: number
  experiencia?: number
  tamanho: string
  alinhamento: string
  penalidadeArmadura: number
  atributoChaveMagia: string
  recursos: IRecurso[]
  atributos: IAtributo[]
  pericias: IPericia[]
}
