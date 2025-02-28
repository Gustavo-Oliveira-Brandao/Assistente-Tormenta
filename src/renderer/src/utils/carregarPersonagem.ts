import { PersonagemT20 } from '@renderer/@types/t20/Personagem'

export const carregarPersonagem = async (personagem: PersonagemT20): Promise<PersonagemT20> => {
  let valorAtributoVida = 0
  let valorAtributoMana = 0
  for (const atributo of personagem.atributos) {
    atributo.valorAtual = atributo.valor + atributo.bonus
    if (personagem.vida.atributo === atributo.nome) {
      valorAtributoVida = atributo.valorAtual
    }
    if (personagem.mana.atributo === atributo.nome) {
      valorAtributoMana = atributo.valorAtual
    }
  }

  personagem.defesa.valorAtual = 10
  for (const pericia of personagem.pericias) {
    let valorTreinamento = 0
    if (pericia.ehTreinado) {
      if (personagem.nivel >= 1 && personagem.nivel <= 6) {
        valorTreinamento = 2
      }
      if (personagem.nivel > 6 && personagem.nivel <= 14) {
        valorTreinamento = 4
      }
      if (personagem.nivel > 14 && personagem.nivel <= 20) {
        valorTreinamento = 6
      }
    }
    for (const atributo of personagem.atributos) {
      if (pericia.atributo === atributo.nome) {
        pericia.valor = Math.floor(atributo.valorAtual + valorTreinamento + personagem.nivel / 2)
      }
    }
  }

  personagem.vida.valorMaximo =
    personagem.vida.valorBase +
    (personagem.vida.valorPorNivel + valorAtributoVida) * personagem.nivel

  personagem.mana.valorMaximo =
    personagem.mana.valorBase + personagem.mana.valorPorNivel * personagem.nivel

  personagem.mana.limitePM = personagem.nivel + valorAtributoMana

  return personagem
}
