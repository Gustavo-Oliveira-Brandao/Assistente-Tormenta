import { z } from 'zod'

export const deslocamentoSchema = z.object({
  caminhada: z.coerce.number(),
  escalada: z.coerce.number(),
  natacao: z.coerce.number(),
  voo: z.coerce.number(),
  escavacao: z.coerce.number()
})
