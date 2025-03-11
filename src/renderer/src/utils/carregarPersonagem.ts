import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { exibirRacas } from '@renderer/api/raca/exibirRacas'

export const carregarPersonagem = async (personagem: PersonagemT20): Promise<PersonagemT20> => {
  const racas = await exibirRacas()
  const racaAtual = racas.find((raca) => raca.nome === personagem.raca.toLowerCase())

  if (racaAtual) {
    personagem.atributos.forEach((atributo) => {
      const boost = racaAtual.atributos.find(
        (atributoRaca) => atributoRaca.atributo === atributo.nome
      )
      atributo.racial = boost ? boost.valor : 0
      atributo.valorAtual = atributo.valor + atributo.bonus + atributo.racial
    })
  }

  const valorAtributoVida =
    personagem.atributos.find((atributo) => atributo.nome === personagem.vida.atributo || 0)
      ?.valorAtual || 0
  const valorAtributoMana =
    personagem.atributos.find((atributo) => atributo.nome === personagem.mana.atributo || 0)
      ?.valorAtual || 0

  const valorAtributoDefesa =
    personagem.atributos.find((atributo) => atributo.nome === personagem.defesa.atributo)
      ?.valorAtual || 0

  personagem.defesa.valorAtual =
    10 +
    personagem.defesa.armadura +
    personagem.defesa.escudo +
    personagem.defesa.outros +
    personagem.defesa.temporario +
    valorAtributoDefesa

  personagem.pericias.forEach((pericia) => {
    let valorTreinamento = 0
    if (pericia.treinamento === 'treinado') {
      valorTreinamento = personagem.nivel <= 6 ? 2 : personagem.nivel <= 14 ? 4 : 6
    }
    const atributo = personagem.atributos.find((atributo) => atributo.nome === pericia.atributo)
    if (atributo) {
      pericia.valor = Math.floor(atributo.valorAtual + valorTreinamento + personagem.nivel / 2)
      if (pericia.sofrePenalidadeArmadura) {
        pericia.valor -= personagem.defesa.penalidadeArmaduraTotal
      }
    }
  })

  personagem.vida.valorMaximo =
    personagem.vida.valorBase +
    (personagem.vida.valorPorNivel + valorAtributoVida) * personagem.nivel

  personagem.mana.valorMaximo =
    personagem.mana.valorBase + personagem.mana.valorPorNivel * personagem.nivel

  personagem.mana.limitePM = personagem.nivel + valorAtributoMana

  return personagem
}
