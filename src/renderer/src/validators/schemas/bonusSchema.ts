import { z } from 'zod'

export const bonusSchema = z.object({
  label: z.string(),
  valor: z.coerce.number(),
  estaAtivo: z.coerce.boolean(),
  ehPorNivel: z.coerce.boolean()
})
