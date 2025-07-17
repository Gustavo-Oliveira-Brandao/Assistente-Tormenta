import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { IDeslocamento } from '@renderer/@types/T20 GOTY/IDeslocamento'
import { IEfeito } from '@renderer/@types/T20 GOTY/IEfeito'
import { IModificador } from '@renderer/@types/T20 GOTY/IModificador'
import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { IStatus } from '@renderer/@types/T20 GOTY/IStatus'
import { exibirCompendio } from '@renderer/api/compendio-service'

export const filtrarModificadoresPorTipoAlvo = (
  efeitos: IEfeito[],
  tipo: string,
  alvo?: string
): IModificador[] => {
  const modificadores: IModificador[] = []

  for (const efeito of efeitos) {
    for (const mod of efeito.modificadores) {
      if (mod.tipo == tipo && (!alvo || mod.alvo == alvo)) {
        modificadores.push(mod)
      }
    }
  }

  return modificadores
}

export const calcularAtributos = (
  atributos: IAtributo[],
  efeitosAtivos: IEfeito[],
  nivelPersonagem: number
): IAtributo[] => {
  const atributosFinais: IAtributo[] = []

  for (const atributo of atributos) {
    const modificadores: IModificador[] = filtrarModificadoresPorTipoAlvo(
      efeitosAtivos,
      'atributos',
      atributo.nome
    )

    const valorModificadores = calcularModificadores(modificadores, nivelPersonagem)
    atributo.valorAtual = atributo.valorBase + atributo.bonus + valorModificadores

    atributosFinais.push(atributo)
  }

  return atributosFinais
}

export const calcularDeslocamentos = (
  personagem: IPersonagem,
  efeitosAtivos: IEfeito[],
  nivelPersonagem: number
): IDeslocamento => {
  const deslocamentos = personagem.deslocamento

  const modificadores: IModificador[] = filtrarModificadoresPorTipoAlvo(
    efeitosAtivos,
    'deslocamentos'
  )

  const bonusCaminhada = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'caminhada'),
    nivelPersonagem
  )
  const bonusVoo = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'voo'),
    nivelPersonagem
  )
  const bonusNatacao = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'natacao'),
    nivelPersonagem
  )
  const bonusEscalada = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'escalada'),
    nivelPersonagem
  )
  const bonusEscavacao = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'escavacao'),
    nivelPersonagem
  )

  deslocamentos.caminhadaAtual = deslocamentos.caminhadaBase + bonusCaminhada
  deslocamentos.vooAtual = deslocamentos.vooBase + bonusVoo
  deslocamentos.natacaoAtual = deslocamentos.natacaoBase + bonusNatacao
  deslocamentos.escaladaAtual = deslocamentos.escaladaBase + bonusEscalada
  deslocamentos.escavacaoAtual = deslocamentos.escavacaoBase + bonusEscavacao

  return deslocamentos
}

export const calcularStatus = async (
  personagem: IPersonagem,
  efeitosAtivos: IEfeito[],
  nivelPersonagem: number
): Promise<IStatus> => {
  const status = personagem.status

  let vidaInicial = 0
  let vidaTotalPorNivel = 0
  let manaTotalPorNivel = 0
  const compendio = await exibirCompendio()
  const classes = compendio.classes
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

  const modificadores: IModificador[] = filtrarModificadoresPorTipoAlvo(efeitosAtivos, 'status')

  const modificadoresVidaMaxima = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'vidaMaxima'),
    nivelPersonagem
  )
  const modificadoresManaMaxima = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'manaMaxima'),
    nivelPersonagem
  )

  const modificadoresDefesa = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'defesaAtual'),
    nivelPersonagem
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

  status.vidaMaxima =
    vidaInicial +
    (vidaTotalPorNivel + status.vidaMaximaBonus + (atributoVidaMaxima?.valorAtual ?? 0)) *
      nivelPersonagem +
    modificadoresVidaMaxima

  status.manaMaxima =
    vidaInicial +
    (manaTotalPorNivel + status.manaMaximaBonus + (atributoManaMaxima?.valorAtual ?? 0)) *
      nivelPersonagem +
    modificadoresManaMaxima

  status.defesaAtual =
    personagem.status.defesaBase +
    status.defesaBonus +
    (atributoDefesa?.valorAtual ?? 0) +
    modificadoresDefesa

  return status
}

export const calcularPericias = (
  personagem: IPersonagem,
  efeitosAtivos: IEfeito[],
  nivelAtual: number
): IPericia[] => {
  const pericias = personagem.pericias

  for (const pericia of pericias) {
    let valorTreinamento = 0

    const modificadores: IModificador[] = filtrarModificadoresPorTipoAlvo(
      efeitosAtivos,
      'pericias',
      pericia.nome
    )

    const valorModificadoresPericia = calcularModificadores(modificadores, nivelAtual)
    if (pericia.treinamento === 'treinado') {
      valorTreinamento = nivelAtual <= 6 ? 2 : nivelAtual <= 14 ? 4 : 6
    }
    const atributo = personagem.atributos.find((atributo) => atributo.nome === pericia.atributo)
    if (atributo) {
      pericia.valorAtual = Math.floor(
        (atributo.valorAtual ?? 0) +
          valorTreinamento +
          nivelAtual / 2 +
          valorModificadoresPericia +
          pericia.bonus
      )
    }
  }

  return pericias
}

export const carregarPersonagem = async (personagem: IPersonagem): Promise<IPersonagem> => {
  let nivelAtual = 0

  console.log(personagem)

  for (const classe of personagem.classes) {
    nivelAtual += classe.nivel
  }

  personagem.nivelAtual = nivelAtual

  const efeitosAtivos = personagem.efeitos.filter((efeito) => efeito.estaAtivo)

  personagem.atributos = calcularAtributos(
    personagem.atributos,
    efeitosAtivos,
    personagem.nivelAtual
  )

  personagem.pericias = calcularPericias(personagem, efeitosAtivos, personagem.nivelAtual)

  personagem.status = await calcularStatus(personagem, efeitosAtivos, personagem.nivelAtual)

  personagem.deslocamento = calcularDeslocamentos(personagem, efeitosAtivos, personagem.nivelAtual)

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
