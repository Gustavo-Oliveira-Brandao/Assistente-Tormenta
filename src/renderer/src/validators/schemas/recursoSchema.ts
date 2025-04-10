import { z } from 'zod'
import { bonusSchema } from './bonusSchema'

export const recursoSchema = z.object({
  id: z.coerce.number(),
  categoria: z.coerce.string(),
  valorAtual: z.coerce.number(),
  valorTemporario: z.coerce.number(),
  atributo: z.coerce.string().nullable(),
  bonus: z.array(bonusSchema)
})
