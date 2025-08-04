/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'
import { IRacaPersonagem } from '../../Tormenta20.Domain/@types/IRaca'
import { IClassePersonagem } from '../../Tormenta20.Domain/@types/IClasse'
import { IAtributoCalculado } from './IAtributo'
import { IPericiaCalculada } from './IPericia'
import { IStatusCalculado } from './IStatus'
import { IDeslocamentoCalculado } from './IDeslocamento'
import { IEfeito } from '../../Tormenta20.Domain/@types/IEfeito'
import { IProficiencia } from '../../Tormenta20.Domain/@types/IProficiencia'

export type IPersonagemFinal = {
  id: number
  nome: string
  categoria: string
  nivel: number
  tamanho: string
  classeOriginal: string
  origem: string
  divindade: string
  experiencia: number
  alinhamentoEtico: string
  alinhamentoMoral: string
  raca: IRacaPersonagem
  classes: IClassePersonagem[]
  atributos: IAtributoCalculado[]
  pericias: IPericiaCalculada[]
  status: IStatusCalculado
  deslocamentos: IDeslocamentoCalculado
  efeitos: IEfeito[]
  proficiencias: IProficiencia[]
}

const personagemGetAll = Prisma.validator<Prisma.PersonagemDefaultArgs>()({
  include: { raca: true }
})

export type IPersonagemResponseManyDTO = Prisma.PersonagemGetPayload<typeof personagemGetAll>

const personagemGet = Prisma.validator<Prisma.PersonagemDefaultArgs>()({
  include: {
    raca: {
      include: {
        racaAtributos: true
      }
    },
    classes: {
      include: {
        habilidades: true
      }
    },
    atributos: true,
    pericias: true,
    deslocamentos: true,
    status: true,
    efeitos: {
      include: {
        modificadores: true
      }
    },
    proficiencias: true
  }
})

export type IPersonagemResponseDTO = Prisma.PersonagemGetPayload<typeof personagemGet>
