import { DeepPartial } from 'typeorm'
import { IPoder } from './IPoder'

export type IProgressao = {
  nivel: number
  poderes: DeepPartial<IPoder>[]
}
