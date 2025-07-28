import { Personagem } from '@prisma/client'
import { prisma } from '../..'
import { calcularPersonagem } from '../../utils/calculos da ficha/Calcular_Personagem'
import { IPersonagemFinal, IPersonagemResponseManyDTO } from '../../@types/T20 GOTY/IPersonagem'
import { IRacaRequestPutDTO } from '../../@types/T20 GOTY/IRaca'
import { IClasseRequestPostDTO, IClasseRequestPutDTO } from '../../@types/T20 GOTY/IClasse'

export const getTodosPersonagem = async (): Promise<IPersonagemResponseManyDTO[]> => {
  try {
    const personagens = await prisma.personagem.findMany({
      include: {
        raca: true
      }
    })
    return personagens
  } catch {
    throw new Error('Erro ao exibir personagens!')
  }
}

export const getPersonagem = async (id: number): Promise<IPersonagemFinal> => {
  try {
    const personagem = await prisma.personagem.findUnique({
      where: { id: id },
      include: {
        raca: {
          include: {
            racaAtributos: true
          }
        },
        classes: {
          include: {
            habilidades: true
          }
        },
        atributos: true,
        pericias: true,
        deslocamentos: true,
        status: true,
        efeitos: {
          include: {
            modificadores: true
          }
        },
        proficiencias: true
      }
    })

    if (personagem) {
      const personagemCalculado = await calcularPersonagem(personagem)
      return personagemCalculado
    }

    throw new Error('Personagem não encontrado')
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao exibir personagem.')
  }
}

export const postPersonagem = async (nomePersonagem: string): Promise<void> => {
  try {
    await prisma.personagem.create({
      data: {
        nome: nomePersonagem,
        categoria: 'PJ',
        nivel: 1,
        tamanho: 'médio',
        classeOriginal: '',
        origem: '',
        divindade: '',
        experiencia: 0,
        alinhamentoEtico: '',
        alinhamentoMoral: '',
        raca: {
          create: {
            key: '',
            nome: '',
            tipo: '',
            descricao: ''
          }
        },
        classes: {
          create: [
            {
              nome: '',
              nivel: 1,
              descricao: '',
              key: '',
              vidaInicial: 0,
              vidaPorNivel: 0,
              manaPorNivel: 0,
              devotoFiel: false
            }
          ]
        },
        atributos: {
          create: [
            {
              nome: 'Força',
              key: 'T20:atributos:for',
              valorBase: 0,
              bonus: 0,
              descricao: ''
            },

            {
              nome: 'Destreza',
              key: 'T20:atributos:des',
              valorBase: 0,
              bonus: 0,
              descricao: ''
            },

            {
              nome: 'Constituição',
              key: 'T20:atributos:con',
              valorBase: 0,
              bonus: 0,
              descricao: ''
            },

            {
              nome: 'Inteligência',
              key: 'T20:atributos:int',
              valorBase: 0,
              bonus: 0,
              descricao: ''
            },

            {
              nome: 'Sabedoria',
              key: 'T20:atributos:sab',
              valorBase: 0,
              bonus: 0,
              descricao: ''
            },

            {
              nome: 'Carisma',
              key: 'T20:atributos:car',
              valorBase: 0,
              bonus: 0,
              descricao: ''
            }
          ]
        },
        pericias: {
          create: [
            {
              key: 'T20:pericias:acro',
              nome: 'Acrobacia',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:des',
              requerTreinamento: false,
              sofrePenalidadeArmadura: true,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:ades',
              nome: 'Adestramento',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:car',
              requerTreinamento: true,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:atle',
              nome: 'Atletismo',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:for',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:atua',
              nome: 'Atuação',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:car',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:cava',
              nome: 'Cavalgar',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:des',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:conh',
              nome: 'Conhecimento',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:int',
              requerTreinamento: true,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:cura',
              nome: 'Cura',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:sab',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:dipl',
              nome: 'Diplomacia',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:car',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:enga',
              nome: 'Enganação',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:car',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:fort',
              nome: 'Fortitude',
              ehTreinado: false,
              categoria: 'testeResistencia',
              atributo: 'T20:atributos:con',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:furt',
              nome: 'Furtividade',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:des',
              requerTreinamento: false,
              sofrePenalidadeArmadura: true,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:guer',
              nome: 'Guerra',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:int',
              requerTreinamento: true,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:inic',
              nome: 'Iniciativa',
              ehTreinado: false,
              categoria: 'combate',
              atributo: 'T20:atributos:des',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:inti',
              nome: 'Intimidação',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:car',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:intu',
              nome: 'Intuição',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:sab',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:inve',
              nome: 'Investigação',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:int',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:joga',
              nome: 'Jogatina',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:car',
              requerTreinamento: true,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:ladi',
              nome: 'Ladinagem',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:des',
              requerTreinamento: true,
              sofrePenalidadeArmadura: true,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:luta',
              nome: 'Luta',
              ehTreinado: false,
              categoria: 'combate',
              atributo: 'T20:atributos:for',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:mist',
              nome: 'Misticismo',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:int',
              requerTreinamento: true,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:nobr',
              nome: 'Nobreza',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:int',
              requerTreinamento: true,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:perc',
              nome: 'Percepção',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:sab',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:pilo',
              nome: 'Pilotagem',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:des',
              requerTreinamento: true,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:pont',
              nome: 'Pontaria',
              ehTreinado: false,
              categoria: 'combate',
              atributo: 'T20:atributos:des',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:refl',
              nome: 'Reflexos',
              ehTreinado: false,
              categoria: 'testeResistencia',
              atributo: 'T20:atributos:des',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:reli',
              nome: 'Religião',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:sab',
              requerTreinamento: true,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:sobr',
              nome: 'Sobrevivência',
              ehTreinado: false,
              categoria: 'geral',
              atributo: 'T20:atributos:sab',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            },
            {
              key: 'T20:pericias:vont',
              nome: 'Vontade',
              ehTreinado: false,
              categoria: 'testeResistencia',
              atributo: 'T20:atributos:sab',
              requerTreinamento: false,
              sofrePenalidadeArmadura: false,
              descricao: '',
              bonus: 0
            }
          ]
        },
        status: {
          create: {
            vidaAtual: 0,
            vidaMaximaBonus: 0,
            vidaTemporaria: 0,
            atributoVidaMaxima: 'T20:atributos:con',
            manaAtual: 0,
            manaMaximaBonus: 0,
            manaTemporaria: 0,
            atributoManaMaxima: 'Nenhum',
            defesaBase: 10,
            defesaBonus: 0,
            atributoDefesa: 'T20:atributos:des'
          }
        },
        deslocamentos: {
          create: {
            caminhadaBase: 9,
            vooBase: 0,
            natacaoBase: 0,
            escaladaBase: 0,
            escavacaoBase: 0,
            plana: false
          }
        },
        grimorio: {
          create: {
            atributoChaveMagias: 'Nenhum',
            bonusCD: 0
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao criar personagem!')
  }
}

export const putPersonagem = async (id: number, personagem: Personagem): Promise<void> => {
  try {
    await prisma.personagem.update({
      where: {
        id: id
      },
      data: {
        nome: personagem.nome,
        categoria: personagem.categoria,
        tamanho: personagem.tamanho,
        classeOriginal: personagem.classeOriginal,
        origem: personagem.origem,
        divindade: personagem.origem,
        experiencia: personagem.experiencia,
        alinhamentoEtico: personagem.alinhamentoEtico,
        alinhamentoMoral: personagem.alinhamentoMoral
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao atualizar personagem!')
  }
}

export const deletePersonagem = async (id: number): Promise<void> => {
  try {
    await prisma.personagem.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao excluir personagem.')
  }
}

export const putRaca = async (id: number, raca: IRacaRequestPutDTO): Promise<void> => {
  try {
    const idsAtributosAManter = raca.racaAtributos
      .map((atributo) => atributo.id)
      .filter((id) => id != undefined)

    await prisma.raca.update({
      where: {
        id: id
      },
      data: {
        key: raca.key,
        nome: raca.nome,
        tipo: raca.tipo,
        descricao: raca.descricao,
        racaAtributos: {
          deleteMany: {
            id: {
              notIn: idsAtributosAManter
            },
            racaId: raca.id
          },
          upsert: raca.racaAtributos.map((atributo) => ({
            where: {
              id: atributo.id
            },
            update: {
              atributo: atributo.atributo,
              valor: atributo.valor
            },
            create: { ...atributo }
          }))
        }
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao atualizar raça.')
  }
}

export const postClasse = async (
  classe: IClasseRequestPostDTO,
  idPersonagem: number
): Promise<void> => {
  try {
    await prisma.classe.create({
      data: {
        key: classe.key,
        nivel: classe.nivel,
        descricao: classe.descricao,
        vidaInicial: classe.vidaInicial,
        vidaPorNivel: classe.vidaPorNivel,
        manaPorNivel: classe.manaPorNivel,
        nome: classe.nome,
        devotoFiel: classe.devotoFiel,
        habilidades: {
          create: classe.habilidades
        },
        personagem: {
          connect: {
            id: idPersonagem
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao adicionar classe.')
  }
}

export const putClasse = async (id: number, classe: IClasseRequestPutDTO): Promise<void> => {
  try {
    const idsHabilidadesAManter = classe.habilidades
      .map((habilidade) => habilidade.id)
      .filter((id) => id != undefined)

    await prisma.classe.update({
      where: {
        id: id
      },
      data: {
        nome: classe.nome,
        key: classe.key,
        nivel: classe.nivel,
        descricao: classe.descricao,
        vidaInicial: classe.vidaInicial,
        vidaPorNivel: classe.vidaPorNivel,
        devotoFiel: classe.devotoFiel,
        manaPorNivel: classe.manaPorNivel,
        habilidades: {
          deleteMany: {
            id: {
              notIn: idsHabilidadesAManter
            }
          },
          upsert: classe.habilidades.map((hab) => ({
            where: {
              id: hab.id
            },
            update: {
              key: hab.key,
              nivel: hab.nivel
            },
            create: { ...hab }
          }))
        }
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao atualizar a classe.')
  }
}

export const deleteClasse = async (id: number): Promise<void> => {
  try {
    await prisma.classe.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao deletar a classe.')
  }
}
