import { z } from 'zod'

export const bonusSchema = z.object({
  label: z.string().nonempty('Nome não pode ser vazio'),
  valor: z.coerce.number(),
  estaAtivo: z.coerce.boolean(),
  ehPorNivel: z.coerce.boolean()
})
