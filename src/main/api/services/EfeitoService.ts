import { prisma } from '../..'
import { IEfeitoRequestDTO } from '../../@types/T20 GOTY/dto/IEfeitoDTO'
import { IEfeito } from '../../@types/T20 GOTY/IEfeito'

export const getEfeitosPersonagem = async (_idPersonagem: number): Promise<IEfeito[]> => {
  try {
    const efeitos = await prisma.efeito.findMany({
      where: {
        personagemId: _idPersonagem
      },
      include: {
        modificadores: true
      }
    })
    return efeitos
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao recuperar efeitos!')
  }
}

export const postEfeito = async (
  _efeito: IEfeitoRequestDTO,
  _idPersonagem: number
): Promise<void> => {
  try {
    await prisma.efeito.create({
      data: {
        ..._efeito,
        modificadores: {
          create: _efeito.modificadores
        },
        personagem: {
          connect: {
            id: _idPersonagem
          }
        }
      }
    })
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao adicionar efeito.')
  }
}

export const putEfeito = async (id: number, _efeito: IEfeito): Promise<void> => {
  try {
    const idsModificadoresAManter = _efeito.modificadores
      .map((mod) => mod.id)
      .filter((id) => id != undefined)

    await prisma.efeito.update({
      where: {
        id: id
      },
      data: {
        nome: _efeito.nome,
        estaAtivo: _efeito.estaAtivo,
        modificadores: {
          deleteMany: {
            id: {
              notIn: idsModificadoresAManter
            },
            efeitoId: _efeito.id
          },
          upsert: _efeito.modificadores.map((mod) => ({
            where: {
              id: mod.id
            },
            update: {
              tipo: mod.tipo,
              alvo: mod.alvo,
              valor: mod.valor,
              modoBonus: mod.modoBonus,
              estaAtivo: mod.estaAtivo,
              escalonamento: mod.escalonamento
            },
            create: { ...mod }
          }))
        }
      }
    })
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao atualizar efeito!')
  }
}

export const deleteEfeito = async (_id: number): Promise<void> => {
  try {
    await prisma.efeito.delete({
      where: {
        id: _id
      }
    })
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao deletar efeito')
  }
}
