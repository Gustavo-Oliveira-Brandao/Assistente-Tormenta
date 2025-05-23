import { z } from 'zod'
import { bonusSchema } from './bonus'

export const recursoSchema = z.object({
  categoria: z.string().nonempty('Campo obrigatório!'),
  valorAtual: z.coerce.number(),
  valorTemporario: z.coerce.number().optional(),
  atributo: z.coerce.number().optional(),
  bonus: z.array(bonusSchema)
})
