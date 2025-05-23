import { z } from 'zod'

export const bonusSchema = z
  .object({
    label: z.string().nonempty('Campo obrigatório!'),
    valor: z.coerce.number(),
    estaAtivo: z.coerce.boolean(),
    ehPorNivel: z.coerce.boolean()
  })
  .required()
