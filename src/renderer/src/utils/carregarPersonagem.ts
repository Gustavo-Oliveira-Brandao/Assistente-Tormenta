import { classe } from '@renderer/@types/t20/classe'
import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import classes from "../assets/data/t20/classes/classes.json"

export const carregarPersonagem = async (personagem: PersonagemT20): Promise<PersonagemT20> => {
  let vidaInicial = 0
  let vidaPorNivel = 0
  let manaPorNivel = 0

  const data = await listarClasses()

  for (const classeT20 of data) {
    if (classeT20.nome === personagem.classe.toLowerCase()) {
      vidaInicial = classeT20.vidaInicial
      vidaPorNivel = classeT20.vidaPorNivel
      manaPorNivel = classeT20.manaPorNivel
    }
  }

  personagem.vida.valorMaximo = vidaInicial + vidaPorNivel * personagem.nivel
  personagem.mana.valorMaximo = manaPorNivel * personagem.nivel

  for (const atributo of personagem.atributos) {
    atributo.valorAtual = atributo.valorBase

    if (atributo.nome === personagem.defesa.atributo) {
      personagem.defesa.valorAtual = 10 + atributo.valorAtual
    }
  }

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
        pericia.valorAtual = Math.floor(
          atributo.valorAtual + valorTreinamento + personagem.nivel / 2
        )
      }
    }
  }
  return personagem
}

const listarClasses = async (): Promise<classe[]> => {
  return classes
}
