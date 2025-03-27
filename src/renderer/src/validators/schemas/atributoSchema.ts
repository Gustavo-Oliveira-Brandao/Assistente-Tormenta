import { z } from 'zod'
import { bonusSchema } from './bonusSchema'

export const atributoSchema = z
  .object({
    valor: z.coerce.number(),
    bonus: z.array(bonusSchema).optional()
  })
  .required()
