import { z } from 'zod'

export const personagemSchema = z.object({
  nome: z.string(),
  tipoCriatura: z.string(),
  raca: z.string(),
  classe: z.string(),
  origem: z.string(),
  divindade: z.string(),
  tamanho: z.string(),
  alinhamento: z.string()
})
