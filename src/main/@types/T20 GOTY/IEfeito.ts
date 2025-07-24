/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

export type IEfeito = {
  id: number
  nome: string
  estaAtivo: boolean
  fonte: string
  modificadores: IModificador[]
}

export type IModificador = {
  id: number
  tipo: string
  alvo: string
  valor: number
  modoBonus: string
  estaAtivo: boolean
  escalonamento: string
}

const efeitoPost = Prisma.validator<Prisma.EfeitoDefaultArgs>()({
  select: {
    nome: true,
    estaAtivo: true,
    fonte: true
  },
  include: {
    modificadores: {
      select: {
        tipo: true,
        alvo: true,
        valor: true,
        modoBonus: true,
        escalonamento: true,
        estaAtivo: true
      }
    }
  }
})

export type IEfeitoPostRequestDTO = Prisma.EfeitoGetPayload<typeof efeitoPost>
