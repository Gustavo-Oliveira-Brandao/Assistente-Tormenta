import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'

export const carregarPersonagem = (personagem: IPersonagem): IPersonagem => {
  let nivelFinal = 0
  let vidaInicial = 0
  let vidaTotalPorNivel = 0
  let manaTotalPorNivel = 0
  for (const classe of personagem.classes) {
    nivelFinal += classe.nivel ?? 0
    vidaTotalPorNivel += classe.vidaPorNivel * (classe.nivel ?? 0)
    manaTotalPorNivel += classe.manaPorNivel * (classe.nivel ?? 0)
    if (classe.ehPrincipal) {
      vidaInicial = classe.vidaInicial
    }
  }
  personagem.nivel = nivelFinal
  for (const recurso of personagem.recursos) {
    const atributo = personagem.atributos.find((atributo) => atributo.nome == recurso.atributo)
    if (recurso.categoria == 'vida') {
      const valorAtributoVida = (atributo?.valorBase ?? 0) * personagem.nivel
      recurso.valorMaximo = vidaInicial + vidaTotalPorNivel + valorAtributoVida
    }
    if (recurso.categoria == 'mana') {
      recurso.valorMaximo = manaTotalPorNivel
    }
    if (recurso.categoria == 'defesa') {
      const valorAtributoDefesa = atributo?.valorBase ?? 0
      recurso.valorMaximo = recurso.valorAtual + valorAtributoDefesa
    }
  }

  for (const pericia of personagem.pericias) {
    let valorTreinamento = 0
    if (pericia.treinamento === 'treinado') {
      valorTreinamento = personagem.nivel <= 6 ? 2 : personagem.nivel <= 14 ? 4 : 6
    }
    const atributo = personagem.atributos.find((atributo) => atributo.nome === pericia.atributo)
    if (atributo) {
      pericia.valorAtual = Math.floor(atributo.valorBase + valorTreinamento + personagem.nivel / 2)
    }
  }

  return personagem
}
