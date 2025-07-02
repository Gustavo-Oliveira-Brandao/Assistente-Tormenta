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
      modificadores.filter((mod) => mod.tipo == 'atributos' && mod.alvo == atributo.nome),
      personagem.nivelAtual
    )
    atributo.valorAtual = atributo.valorBase + valorModificadores
  }

  //Calculo de status
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

  const modificadoresVidaMaxima = calcularModificadores(
    modificadores.filter((mod) => mod.tipo == 'status' && mod.alvo == 'vidaMaxima'),
    personagem.nivelAtual
  )
  const modificadoresManaMaxima = calcularModificadores(
    modificadores.filter((mod) => mod.tipo == 'status' && mod.alvo == 'manaMaxima'),
    personagem.nivelAtual
  )

  const modificadoresDefesa = calcularModificadores(
    modificadores.filter((mod) => mod.tipo == 'status' && mod.alvo == 'defesaAtual'),
    personagem.nivelAtual
  )

  const atributoVidaMaxima = personagem.atributos.find(
    (atributo) => atributo.nome == personagem.status.atributoVidaMaxima
  )

  const atributoManaMaxima = personagem.atributos.find(
    (atributo) => atributo.nome == personagem.status.atributoManaMaxima
  )
  const atributoDefesa = personagem.atributos.find(
    (atributo) => atributo.nome == personagem.status.atributoDefesa
  )

  //Calculo de Status
  personagem.status.vidaMaxima =
    vidaInicial +
    (vidaTotalPorNivel + (atributoVidaMaxima?.valorAtual ?? 0)) * personagem.nivelAtual +
    modificadoresVidaMaxima

  personagem.status.manaMaxima =
    vidaInicial +
    (manaTotalPorNivel + (atributoManaMaxima?.valorAtual ?? 0)) * personagem.nivelAtual +
    modificadoresManaMaxima

  personagem.status.defesaAtual =
    personagem.status.defesaBase + (atributoDefesa?.valorAtual ?? 0) + modificadoresDefesa

  //Calculo de pericias
  for (const pericia of personagem.pericias) {
    let valorTreinamento = 0
    const valorModificadoresPericia = calcularModificadores(
      modificadores.filter((mod) => mod.tipo == 'pericias' && mod.alvo == pericia.nome),
      personagem.nivelAtual
    )
    if (pericia.treinamento === 'treinado') {
      valorTreinamento = personagem.nivelAtual <= 6 ? 2 : personagem.nivelAtual <= 14 ? 4 : 6
    }
    const atributo = personagem.atributos.find((atributo) => atributo.nome === pericia.atributo)
    if (atributo) {
      pericia.valorAtual = Math.floor(
        (atributo.valorAtual ?? 0) +
          valorTreinamento +
          personagem.nivelAtual / 2 +
          valorModificadoresPericia
      )
    }
  }

  return personagem
}

const calcularModificadores = (modificadores: IModificador[], nivel: number): number => {
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
  return bonusTotal
}
