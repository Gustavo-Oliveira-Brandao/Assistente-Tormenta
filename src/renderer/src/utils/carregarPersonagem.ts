import { IBonus } from '@renderer/@types/T20 GOTY/IBonus'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { exibirClassesDefault } from '@renderer/api/classe-service'

export const carregarPersonagem = async (personagem: IPersonagem): Promise<IPersonagem> => {
  //Calculo de atributo
  for (const atributo of personagem.atributos) {
    const bonusTotal = calcularBonus(atributo.bonus, personagem.nivelAtual)
    atributo.valorAtual = atributo.valorBase + bonusTotal
  }

  //Calculo de recursos
  let vidaInicial = 0
  let vidaTotalPorNivel = 0
  let manaTotalPorNivel = 0
  const classes = await exibirClassesDefault()
  for (const classe of classes) {
    if (classe.nome === personagem.classe) {
      vidaInicial = classe.vidaInicial
    }
  }

  if (personagem.niveis) {
    for (const nivel of personagem.niveis) {
      for (const classe of classes) {
        if (classe.nome === nivel.classe) {
          vidaTotalPorNivel += classe.vidaPorNivel
          manaTotalPorNivel += classe.manaPorNivel
        }
      }
    }
  }

  for (const recurso of personagem.recursos) {
    const atributo = personagem.atributos.find((atributo) => atributo.nome == recurso.atributo)
    const valorAtributo = atributo?.valorAtual ?? 0
    const bonusTotal = calcularBonus(recurso.bonus, personagem.nivelAtual)
    if (recurso.categoria == 'vida') {
      recurso.valorMaximo =
        vidaInicial + bonusTotal + (vidaTotalPorNivel + valorAtributo) * personagem.nivelAtual
    }
    if (recurso.categoria == 'mana') {
      recurso.valorMaximo = valorAtributo + bonusTotal + manaTotalPorNivel * personagem.nivelAtual
    }
    if (recurso.categoria == 'defesa') {
      recurso.valorMaximo = recurso.valorAtual + valorAtributo + bonusTotal
    }
  }

  //Calculo de pericias
  for (const pericia of personagem.pericias) {
    let valorTreinamento = 0
    if (pericia.treinamento === 'treinado') {
      valorTreinamento = personagem.nivelAtual <= 6 ? 2 : personagem.nivelAtual <= 14 ? 4 : 6
    }
    const bonusTotal = calcularBonus(pericia.bonus, personagem.nivelAtual)
    const atributo = personagem.atributos.find((atributo) => atributo.nome === pericia.atributo)
    if (atributo) {
      pericia.valorAtual = Math.floor(
        (atributo.valorAtual ?? 0) + valorTreinamento + bonusTotal + personagem.nivelAtual / 2
      )
    }
  }

  return personagem
}

const calcularBonus = (bonus: IBonus[], nivel: number): number => {
  let bonusTotal = 0
  for (const mod of bonus) {
    if (mod.estaAtivo) {
      if (mod.ehPorNivel) {
        bonusTotal += mod.valor * nivel
      } else {
        bonusTotal += mod.valor
      }
    }
  }
  return bonusTotal
}
