import { z } from 'zod'
import { bonusSchema } from './bonusSchema'

export const recursoSchema = z
  .object({
    valorAtual: z.coerce.number(),
    valorTemporario: z.coerce.number(),
    atributo: z.coerce.string(),
    bonus: z.array(bonusSchema)
  })
  .required()
