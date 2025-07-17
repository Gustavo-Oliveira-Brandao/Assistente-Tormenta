import { DeepPartial } from 'typeorm'
import { IClasse } from './IClasse'
import { IRaca } from './IRaca'
import { IEquipamento } from './IInventario'
import { IPoder } from './IPoder'
import { IMagia } from './IMagia'
import { IDivindade } from './IDivindade'
import { IOrigem } from './IOrigem'

export type ICompendio = {
  classes: IClasse[]
  divindades: IDivindade[]
  origens: IOrigem[]
  racas: IRaca[]
  equipamentos: DeepPartial<IEquipamento>[]
  poderes: DeepPartial<IPoder>[]
  magias: DeepPartial<IMagia>[]
}
