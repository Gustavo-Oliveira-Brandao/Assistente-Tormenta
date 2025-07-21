import { Efeito } from '../../../api/entities/Efeito'
import { Classe } from '../../../api/entities/Personagem'
import { IAtributoDTO } from './IAtributoDTO'
import { IDeslocamentoDTO } from './IDeslocamentoDTO'
import { IPericiaDTO } from './IPericiaDTO'
import { IStatusDTO } from './IStatusDTO'

export type IPersonagemDTO = {
  id: number
  nome: string
  tipo: string
  raca: string
  classeInicial: string
  classes: Classe[]
  origem: string
  divindade: string
  nivelAtual: number
  experiencia: number
  tamanho: string
  alinhamentoEtico: string
  alinhamentoMoral: string
  atributos: IAtributoDTO[]
  pericias: IPericiaDTO[]
  deslocamento: IDeslocamentoDTO
  status: IStatusDTO
  efeitos: Efeito[]
}
