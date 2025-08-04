/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

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
