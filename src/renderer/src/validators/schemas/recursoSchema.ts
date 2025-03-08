import { z } from 'zod'

export const recursoSchema = z
  .object({
    valorAtual: z.coerce.number(),
    valorTemporario: z.coerce.number(),
    valorPorNivel: z.coerce.number(),
    valorBase: z.coerce.number(),
    atributo: z.coerce.string()
  })
  .required()
