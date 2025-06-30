import { IModificador } from '@renderer/@types/T20 GOTY/IModificador'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { exibirClassesDefault } from '@renderer/api/classe-service'

export const carregarPersonagem = async (personagem: IPersonagem): Promise<IPersonagem> => {
  let nivelAtual = 0

  const modificadores = personagem.modificadores

  for (const classe of personagem.classes) {
    nivelAtual += classe.nivel
  }

  personagem.nivelAtual = nivelAtual
  //Calculo de atributo
  for (const atributo of personagem.atributos) {
    const valorModificadores = calcularModificadores(
      modificadores.filter((mod) => verificarAlvo(mod.tipo, mod.alvo, 'atributos', atributo.nome)),
      personagem.nivelAtual
    )
    atributo.valorAtual = atributo.valorBase + valorModificadores
  }

  //Calculo de recursos
  let vidaInicial = 0
  let vidaTotalPorNivel = 0
  let manaTotalPorNivel = 0
  const classes = await exibirClassesDefault()
  for (const classe of classes) {
    if (classe.nome === personagem.classeInicial) {
      vidaInicial = classe.vidaInicial
    }
  }

  for (const classePersonagem of personagem.classes) {
    for (const classeDB of classes) {
      if (classeDB.nome === classePersonagem.nome) {
        vidaTotalPorNivel += classeDB.vidaPorNivel
        manaTotalPorNivel += classeDB.manaPorNivel
      }
    }
  }

  for (const recurso of personagem.recursos) {
    const atributo = personagem.atributos.find((atributo) => atributo.nome == recurso.atributo)
    const valorAtributo = atributo?.valorAtual ?? 0
    if (recurso.categoria == 'vida') {
      recurso.valorMaximo =
        vidaInicial + (vidaTotalPorNivel + valorAtributo) * personagem.nivelAtual
    }
    if (recurso.categoria == 'mana') {
      recurso.valorMaximo = valorAtributo + manaTotalPorNivel * personagem.nivelAtual
    }
    if (recurso.categoria == 'defesa') {
      recurso.valorMaximo = recurso.valorAtual + valorAtributo
    }
  }

  //Calculo de pericias
  for (const pericia of personagem.pericias) {
    let valorTreinamento = 0
    if (pericia.treinamento === 'treinado') {
      valorTreinamento = personagem.nivelAtual <= 6 ? 2 : personagem.nivelAtual <= 14 ? 4 : 6
    }
    const atributo = personagem.atributos.find((atributo) => atributo.nome === pericia.atributo)
    if (atributo) {
      pericia.valorAtual = Math.floor(
        (atributo.valorAtual ?? 0) + valorTreinamento + personagem.nivelAtual / 2
      )
    }
  }

  return personagem
}

const calcularModificadores = (modificadores: IModificador[], nivel: number): number => {
  console.log(modificadores)
  let bonusTotal = 0
  for (const mod of modificadores) {
    if (mod.estaAtivo) {
      if (mod.ehPorNivel) {
        bonusTotal += mod.valor * nivel
      } else {
        bonusTotal += mod.valor
      }
    }
  }
  console.log(bonusTotal)
  return bonusTotal
}

const verificarAlvo = (
  tipo: string,
  alvo: string,
  tipoProcurado: string,
  alvoProcurado: string
): boolean => {
  if (tipo == tipoProcurado) {
    if (alvo == alvoProcurado) {
      return true
    }
  }
  return false
}
