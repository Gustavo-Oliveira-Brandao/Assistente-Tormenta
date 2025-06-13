import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { CardPoder } from '@renderer/components/card-poder/card-poder'
import { useCriarPoder, useDeletarPoder } from '@renderer/hooks/mutations/usePoderMutation'
import { useExibirClassesDefault } from '@renderer/hooks/selectors/useClasseQuery'
import {
  useExibirPoderesDefault,
  useExibirPoderesPersonagem
} from '@renderer/hooks/selectors/usePoderQuery'
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { RootState } from '@renderer/store/store'
import { Modal } from '@renderer/templates/modal/modal'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { JSX, useState, useMemo, ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ficha-personagem.module.scss'
import { useExibirRacasDefault } from '@renderer/hooks/selectors/useRacaQuery'
import { opcoesRacas } from '@renderer/utils/select options/opcoesRacas'
import { opcoesCategoriasPoderesGerais } from '@renderer/utils/select options/opcoesCategoriasPoderes'
import { opcoesClasses } from '@renderer/utils/select options/opcoesClasses'
import { IPoderDB } from '@renderer/@types/T20 GOTY/IPoder'

type FichaPoderesProps = {
  personagem: IPersonagem
}

export const FichaPoderes = ({ personagem }: FichaPoderesProps): JSX.Element => {
  const { data: poderesDefault } = useExibirPoderesDefault()
  const { data: poderesRefPersonagem } = useExibirPoderesPersonagem(personagem.id)
  const { data: classes } = useExibirClassesDefault()
  const { data: racas } = useExibirRacasDefault()

  const [categoriaPoderes, setCategoriaPoderes] = useState('CLASSE')
  const [filtroRacaPoderes, setFiltroRacaPoderes] = useState(personagem.raca)
  const [filtroClassePoderes, setFiltroClassePoderes] = useState(personagem.classeInicial)
  const [nivelPoder, setNivelPoder] = useState<number>(personagem.nivelAtual ?? 1)

  const niveisNumeros = Array.from({ length: personagem.nivelAtual ?? 1 }, (_, i) => i + 1)

  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  const poderesRacaDBPesquisados = useMemo(() => {
    if (!racas) {
      return []
    }

    return racas.flatMap((raca) => {
      const poderes: IPoderDB[] = []

      if (filtroRacaPoderes == raca.nome) {
        poderes.push(...raca.poderes)
      }

      return poderes
    })
  }, [racas, filtroRacaPoderes])

  const poderesClasseDBPesquisados = useMemo(() => {
    if (!classes) {
      return []
    }

    return classes.flatMap((classe) => {
      const poderes: IPoderDB[] = []

      if (filtroClassePoderes == classe.nome) {
        poderes.push(...classe.poderesClasse)
      }

      return poderes
    })
  }, [classes, filtroClassePoderes])

  const poderesRaca = useMemo(() => {
    if (!racas || !personagem) {
      return []
    }

    return racas.flatMap((raca) => {
      const poderes: IPoderDB[] = []
      if (raca.nome == personagem.raca) {
        poderes.push(...raca.poderes)
      }

      return poderes
    })
  }, [racas, personagem])

  const poderesClassePersonagem = useMemo(() => {
    if (!classes || !poderesRefPersonagem || !personagem) {
      return []
    }

    return classes.flatMap((classe) => {
      const poderes: IPoderDB[] = []

      for (const classePersonagem of personagem.classes) {
        if (classe.nome == classePersonagem.nome) {
          for (const poderRef of poderesRefPersonagem) {
            for (const poderClasse of classe.poderesClasse) {
              if (poderClasse.key == poderRef.key) {
                poderes.push(poderClasse)
              }
            }
          }
        }
      }
      return poderes
    })
  }, [classes, poderesRefPersonagem, personagem])

  const poderesGeraisPersonagem = useMemo(() => {
    if (!poderesDefault || !poderesRefPersonagem) {
      return []
    }

    return poderesDefault.flatMap((poder) => {
      const poderesPersonagem: IPoderDB[] = []
      for (const poderRef of poderesRefPersonagem) {
        if (poderRef.key == poder.key) {
          console.log(poder)
          console.log(poderRef)
          poderesPersonagem.push(poder)
        }
      }
      return poderesPersonagem
    })
  }, [poderesDefault, poderesRefPersonagem])

  const poderesClasseProgressao = useMemo(() => {
    if (!classes || !personagem) {
      return []
    }

    return classes.flatMap((classe) => {
      const poderes: IPoderDB[] = []

      for (const classePersonagem of personagem.classes) {
        if (classePersonagem.nome === classe.nome) {
          if (personagem.nivelAtual) {
            for (const poder of classe.poderes) {
              if (poder.nivel) {
                if (poder.nivel <= classePersonagem.nivel) {
                  poderes.push(poder)
                }
              }
            }
          }
        }
      }

      return poderes
    })
  }, [classes, personagem])

  const poderesPesquisados = useMemo(() => {
    if (!poderesDefault) {
      return []
    }

    if (categoriaPoderes === 'RACA') {
      return poderesRacaDBPesquisados
    } else if (categoriaPoderes === 'CLASSE') {
      return poderesClasseDBPesquisados
    } else {
      return poderesDefault.filter(
        (poder) =>
          poder.categoria && poder.categoria.toLowerCase() == categoriaPoderes.toLowerCase()
      )
    }
  }, [poderesDefault, categoriaPoderes, poderesClasseDBPesquisados, poderesRacaDBPesquisados])

  const selecionarRaca = (event: ChangeEvent<HTMLSelectElement>): void => {
    setFiltroRacaPoderes(event.target.value)
  }

  const selecionarClasse = (event: ChangeEvent<HTMLSelectElement>): void => {
    setFiltroClassePoderes(event.target.value)
  }

  const selecionarCategoriaPoderes = (event: ChangeEvent<HTMLSelectElement>): void => {
    setCategoriaPoderes(event.target.value)
  }

  const selecionarNivelPoder = (event: ChangeEvent<HTMLSelectElement>): void => {
    setNivelPoder(Number(event.target.value))
  }

  const removerPoderPorKey = (key: number): void => {
    if (poderesRefPersonagem) {
      for (const poderRef of poderesRefPersonagem) {
        if (poderRef.key == key) {
          removerPoder.mutate(poderRef.id)
        }
      }
    }
  }

  const adicionarPoder = useCriarPoder()
  const removerPoder = useDeletarPoder()

  return (
    <div className={styles.secaoPoderes}>
      <div className={styles.poderes}>
        <SecaoFicha
          header={<h2 className="tormenta20Font">Poderes por progressão</h2>}
          css="poderes"
        >
          {poderesRaca.map((poder) => (
            <CardPoder key={poder.key} poder={poder} exibeCategoria={true} nivel={poder.nivel} />
          ))}
          {poderesClasseProgressao
            .sort((a, b) => {
              if (a.nivel == null || b.nivel == null) {
                return 0
              }
              return a.nivel + b.nivel
            })
            .map((poder) => (
              <CardPoder nivel={poder.nivel} poder={poder} key={poder.key} exibeCategoria={true} />
            ))}
        </SecaoFicha>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes de classe</h2>
              <BotaoModular
                css="minimalista"
                texto="Buscar"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setFiltroClassePoderes(personagem.classeInicial)
                  setCategoriaPoderes('CLASSE')
                  dispatch(abrirModal(`PODERES_LOJA_MODAL`))
                }}
                icone="./icons/busca.svg"
              />
            </>
          }
          css="poderes"
        >
          {poderesClassePersonagem &&
            poderesClassePersonagem
              .sort((a, b) => {
                if (!a.nivel || !b.nivel) {
                  return 0
                }
                return a.nivel + b.nivel
              })
              .filter((poder) => poder.categoria === 'classe')
              .map((poder) => (
                <CardPoder
                  nivel={poder.nivel}
                  key={poder.key}
                  poder={poder}
                  onInteract={() => removerPoderPorKey(poder.key)}
                  iconeBotaoInteracao="./icons/delete.svg"
                />
              ))}
        </SecaoFicha>

        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes de origem</h2>

              <BotaoModular
                css="minimalista"
                texto="Buscar"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('ORIGEM')
                  dispatch(abrirModal(`PODERES_LOJA_MODAL`))
                }}
                icone="./icons/busca.svg"
              />
            </>
          }
          css="poderes"
        >
          {poderesGeraisPersonagem &&
            poderesGeraisPersonagem
              .sort((a, b) => {
                if (!a.nivel || !b.nivel) {
                  return 0
                }
                return a.nivel + b.nivel
              })
              .filter((poder) => poder.categoria === 'origem')
              .map((poder) => (
                <CardPoder
                  nivel={poder.nivel}
                  key={poder.key}
                  poder={poder}
                  onInteract={() => removerPoderPorKey(poder.key)}
                  iconeBotaoInteracao="./icons/delete.svg"
                />
              ))}
        </SecaoFicha>
      </div>
      <div className={styles.poderes}>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes gerais</h2>
              <BotaoModular
                css="minimalista"
                texto="Buscar"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('COMBATE')
                  dispatch(abrirModal(`PODERES_LOJA_MODAL`))
                }}
                icone="./icons/busca.svg"
              />
            </>
          }
          css="poderes"
        >
          {poderesGeraisPersonagem &&
            poderesGeraisPersonagem
              .sort((a, b) => {
                if (!a.nivel || !b.nivel) {
                  return 0
                }
                return a.nivel + b.nivel
              })
              .filter((poder) => poder.categoria != 'classe' && poder.categoria != 'origem')
              .map((poder) => (
                <CardPoder
                  nivel={poder.nivel}
                  key={poder.key}
                  exibeCategoria={true}
                  poder={poder}
                  onInteract={() => removerPoderPorKey(poder.key)}
                  iconeBotaoInteracao="./icons/delete.svg"
                />
              ))}
        </SecaoFicha>
      </div>
      {modalAberto === `PODERES_LOJA_MODAL` &&
        createPortal(
          <Modal
            titulo="Adicionar"
            height="400px"
            width="550px"
            sidebar={
              <>
                <div className={styles.filtros}>
                  <p className="tormenta20Font">Filtros</p>
                  <div className={styles.filtro}>
                    <label htmlFor="categoriaPoder" className="tormenta20Font label">
                      Categoria
                    </label>
                    <select
                      id="categoriaPoder"
                      value={categoriaPoderes}
                      className="select tormenta20Font"
                      onChange={(e) => selecionarCategoriaPoderes(e)}
                    >
                      <option value={'CLASSE'}>Classe</option>
                      {opcoesCategoriasPoderesGerais.map((opcao) => (
                        <option key={opcao} value={opcao}>
                          {opcao}
                        </option>
                      ))}
                      <option value={'RACA'}>Raça</option>
                    </select>
                  </div>

                  {categoriaPoderes === 'RACA' && (
                    <div className={styles.filtro}>
                      <label htmlFor="raca" className="tormenta20Font label">
                        Raça
                      </label>
                      <select
                        id="raca"
                        value={filtroRacaPoderes}
                        className="select tormenta20Font"
                        onChange={(e) => selecionarRaca(e)}
                      >
                        {opcoesRacas.map((opcao) => (
                          <option key={opcao} value={opcao}>
                            {opcao}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {categoriaPoderes === 'CLASSE' && (
                    <div className={styles.filtro}>
                      <label htmlFor="classe" className="tormenta20Font label">
                        Classe
                      </label>
                      <select
                        id="classe"
                        className="select tormenta20Font"
                        onChange={(e) => selecionarClasse(e)}
                      >
                        {opcoesClasses.map((opcao) => (
                          <option key={opcao} value={opcao}>
                            {opcao}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </>
            }
          >
            <h3 className="tormenta20Font">Poderes</h3>
            {poderesPesquisados &&
              poderesPesquisados.map((poder) => (
                <CardPoder
                  key={poder.key}
                  poder={poder}
                  iconeBotaoInteracao="./icons/adicao.svg"
                  onInteract={() =>
                    adicionarPoder.mutate({
                      poder,
                      nivelPersonagem: personagem.nivelAtual ?? 1,
                      idPersonagem: personagem.id
                    })
                  }
                />
              ))}
          </Modal>,
          document.body
        )}
    </div>
  )
}
