import { z } from 'zod'

export const periciaSchema = z.object({
  treinamento: z.coerce.string(),
  atributo: z.coerce.string()
})
