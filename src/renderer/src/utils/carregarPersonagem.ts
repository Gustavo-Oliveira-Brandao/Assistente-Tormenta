import { IAtributo } from '@renderer/@types/t20/Atributo'
import { IBonus } from '@renderer/@types/t20/Bonus'
import { ICriatura } from '@renderer/@types/t20/Criatura'
import { exibirClasses } from '@renderer/api/classe/exibirClasses'
import { exibirRacas } from '@renderer/api/raca/exibirRacas'

export const carregarPersonagem = async (personagem: ICriatura): Promise<ICriatura> => {
  const racas = await exibirRacas()
  const racaEscolhida = racas.find((raca) => raca.nome === personagem.raca.toLowerCase())
  const classes = await exibirClasses()
  const classeEscolhida = classes.find((classe) => classe.nome === personagem.classe?.toLowerCase())

  if (racaEscolhida) {
    personagem.atributos.forEach((atributo) => {
      const bonusTotal = calcularBonus(atributo.bonus, personagem.nivel)

      atributo.valorAtual = atributo.valor + bonusTotal
    })
  }

  for (const recurso of personagem.recursos) {
    let valorAtributoRecurso = 0
    if (recurso.atributo) {
      valorAtributoRecurso = extrairValorAtributo(recurso.atributo, personagem.atributos)
    }
    const recursoBonusTotal = calcularBonus(recurso.bonus, personagem.nivel)

    if (classeEscolhida) {
      if (recurso.categoria === 'vida') {
        recurso.valorMaximo =
          classeEscolhida.vidaInicial +
          classeEscolhida.vidaPorNivel * personagem.nivel +
          valorAtributoRecurso +
          recursoBonusTotal
      }
      if (recurso.categoria === 'mana') {
        recurso.valorMaximo =
          classeEscolhida.manaPorNivel * personagem.nivel + valorAtributoRecurso + recursoBonusTotal
      }
      if (recurso.categoria === 'defesa') {
        recurso.valorMaximo = 10 + valorAtributoRecurso + recursoBonusTotal
      }
      if (recurso.categoria === 'deslocamento') {
        recurso.valorMaximo = recurso.valorAtual + recursoBonusTotal
      }
    }
  }

  personagem.pericias.forEach((pericia) => {
    let valorTreinamento = 0
    if (pericia.treinamento === 'treinado') {
      valorTreinamento = personagem.nivel <= 6 ? 2 : personagem.nivel <= 14 ? 4 : 6
    }
    const atributo = personagem.atributos.find((atributo) => atributo.nome === pericia.atributo)
    const periciaBonusTotal = calcularBonus(pericia.bonus, personagem.nivel)
    if (atributo) {
      pericia.valor = Math.floor(
        atributo.valorAtual + valorTreinamento + periciaBonusTotal + personagem.nivel / 2
      )
      if (pericia.sofrePenalidadeArmadura) {
        pericia.valor -= personagem.penalidadeArmadura
      }
    }
  })
  return personagem
}

const extrairValorAtributo = (atributoProcurado: string, atributos: IAtributo[]): number => {
  return atributos.find((atributo) => atributo.nome === atributoProcurado)?.valorAtual ?? 0
}

export const calcularBonus = (bonus: IBonus[], nivel: number): number => {
  return bonus
    .filter((bonus) => bonus.estaAtivo)
    .reduce((total, bonus) => total + (bonus.ehPorNivel ? bonus.valor * nivel : bonus.valor), 0)
}
