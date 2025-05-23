import { z } from 'zod'

export const personagemSchema = z.object({
  nome: z.string().nonempty('Campo obrigatório!'),
  tipo: z.string().nonempty('Campo obrigatório!'),
  idade: z.string().optional(),
  altura: z.string().optional(),
  peso: z.string().optional(),
  raca: z.string().nonempty('Campo obrigatório!'),
  origem: z.string().nonempty('Campo obrigatório!'),
  divindade: z.string().nonempty('Campo obrigatório!'),
  experiencia: z.coerce.number(),
  tamanho: z.string().nonempty('Campo obrigatório!'),
  alinhamentoEtico: z.string().nonempty('Campo obrigatório!'),
  alinhamentoMoral: z.string().nonempty('Campo obrigatório!')
})
