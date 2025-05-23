import { z } from 'zod'
import { bonusSchema } from './bonus'

export const atributoSchema = z
  .object({
    valorBase: z.coerce.number(),
    bonus: z.array(bonusSchema)
  })
  .required()
