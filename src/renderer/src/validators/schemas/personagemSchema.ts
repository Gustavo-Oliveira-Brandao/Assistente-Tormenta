import { z } from 'zod'

export const personagemSchema = z
  .object({
    nome: z.string().nonempty('Nome não pode ser vazio'),
    tipoCriatura: z.string().nonempty('Tipo de criatura não pode ser vazio'),
    raca: z.string().nonempty('Raça não pode ser vazio'),
    classe: z.string().nonempty('Classe não pode ser vazio'),
    origem: z.string().nonempty('Origem não pode ser vazio'),
    divindade: z.string().nonempty('Divindade não pode ser vazio'),
    tamanho: z.string().nonempty('Tamanho não pode ser vazio'),
    alinhamento: z.string().nonempty('Alinhamento não pode ser vazio')
  })
  .required()
