import { Atributo } from './Atributo'
import { Defesa } from './Defesa'
import { Deslocamento } from './Deslocamento'
import { Efeito } from './Efeito'
import { ItemInventario } from './ItemInventario'
import { Magia } from './Magia'
import { Pericia } from './Pericia'
import { Poder } from './Poder'
import { Recurso } from './Recurso'

export interface PersonagemT20 {
  id: number
  nome: string
  raca: string
  classe: string
  origem: string
  divindade: string
  nivel: number
  experiencia: number
  defesa: Defesa
  vida: Recurso
  mana: Recurso
  deslocamento: Deslocamento
  atributos: Atributo[]
  pericias: Pericia[]
  poderes: Poder[]
  itens: ItemInventario[]
  magias: Magia[]
  efeitos: Efeito[]
}
