import { z } from 'zod'

export const modificadorSchema = z
  .object({
    valor: z.coerce.number(),
    tipo: z.string().nonempty('Campo obrigatório!'),
    alvo: z.string().nonempty('Campo obrigatório'),
    modoBonus: z.string().nonempty('Campo obrigatório'),
    estaAtivo: z.coerce.boolean(),
    ehPorNivel: z.coerce.boolean()
  })
  .required()
