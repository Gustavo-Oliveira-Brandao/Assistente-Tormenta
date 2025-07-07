import { z } from 'zod'

export const statusSchema = z
  .object({
    vidaAtual: z.coerce.number(),
    vidaTemporaria: z.coerce.number(),
    vidaMaximaBonus: z.coerce.number(),
    atributoVidaMaxima: z.string(),
    manaAtual: z.coerce.number(),
    manaMaximaBonus: z.coerce.number(),
    manaTemporaria: z.coerce.number(),
    atributoManaMaxima: z.string(),
    defesaBase: z.coerce.number(),
    defesaBonus: z.coerce.number(),
    atributoDefesa: z.string()
  })
  .required()
