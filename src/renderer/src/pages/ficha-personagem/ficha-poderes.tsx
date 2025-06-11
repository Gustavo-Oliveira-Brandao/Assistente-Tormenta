import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { IProgressao } from '@renderer/@types/T20 GOTY/IProgressao'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { CardPoder } from '@renderer/components/card-poder/card-poder'
import { useCriarPoder, useDeletarPoder } from '@renderer/hooks/mutations/usePoderMutation'
import { useExibirClassesDefault } from '@renderer/hooks/selectors/useClasseQuery'
import { useExibirProgressaoPersonagem } from '@renderer/hooks/selectors/usePersonagemQuery'
import { useExibirPoderesDefault } from '@renderer/hooks/selectors/usePoderQuery'
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { RootState } from '@renderer/store/store'
import { Modal } from '@renderer/templates/modal/modal'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { JSX, useState, useMemo, SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeepPartial } from 'typeorm'
import styles from './ficha-personagem.module.scss'
import { useExibirRacasDefault } from '@renderer/hooks/selectors/useRacaQuery'
import { opcoesRacas } from '@renderer/utils/select options/opcoesRacas'
import { opcoesCategoriasPoderesGerais } from '@renderer/utils/select options/opcoesCategoriasPoderes'
import { opcoesClasses } from '@renderer/utils/select options/opcoesClasses'

type FichaPoderesProps = {
  personagem: IPersonagem
}

export const FichaPoderes = ({ personagem }: FichaPoderesProps): JSX.Element => {
  const { data: poderesDefault } = useExibirPoderesDefault()
  const { data: niveis } = useExibirProgressaoPersonagem(personagem.id)
  const { data: classes } = useExibirClassesDefault()
  const { data: racas } = useExibirRacasDefault()

  const [categoriaPoderes, setCategoriaPoderes] = useState('CLASSE')
  const [racaPoderes, setRacaPoderes] = useState(personagem.raca)
  const [classePoderes, setClassePoderes] = useState(personagem.classe)
  const [nivelPoder, setNivelPoder] = useState(1)

  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  const poderesRacaPesquisa = useMemo(() => {
    console.log('falhou')
    if (!racas) {
      return []
    }

    return racas.flatMap((raca) => {
      const poderes: DeepPartial<IPoder>[] = []

      if (racaPoderes == raca.nome) {
        poderes.push(...raca.poderes)
      }

      console.log(raca.nome)
      console.log(racaPoderes)

      return poderes
    })
  }, [racas, racaPoderes])

  const poderesClassePesquisa = useMemo(() => {
    if (!classes) {
      return []
    }

    return classes.flatMap((classe) => {
      const poderes: DeepPartial<IPoder>[] = []

      if (classePoderes == classe.nome) {
        poderes.push(...classe.poderesClasse)
      }

      return poderes
    })
  }, [classes, classePoderes])

  const progressaoPersonagem = useMemo(() => {
    if (!niveis || !classes || !personagem) {
      return []
    }

    return classes.flatMap((classe) => {
      let contadorNivelClasse = 0

      const progressaoPersonagem: IProgressao[] = []

      for (const nivel of niveis) {
        const nivelProgressao: IProgressao = {
          nivel: nivel.valor,
          poderes: []
        }
        if (nivel.classe === classe.nome) {
          if (nivel.valor <= personagem.nivelAtual) {
            contadorNivelClasse++
            for (const progressao of classe.progressao) {
              if (progressao.nivel <= contadorNivelClasse) {
                nivelProgressao.poderes.push(...progressao.poderes)
              }
            }
            progressaoPersonagem.push(nivelProgressao)
          }
        }
      }

      return progressaoPersonagem
    })
  }, [classes, niveis, personagem])

  const poderesPesquisados = useMemo(() => {
    if (!poderesDefault) {
      return []
    }
    let poderesFiltrados: DeepPartial<IPoder>[] = []

    const categorias = opcoesCategoriasPoderesGerais

    for (const categoria of categorias) {
      if (categoriaPoderes === categoria) {
        poderesFiltrados = poderesDefault.filter(
          (poder) => poder.categoria == categoria.toLowerCase()
        )
      }
      if (categoriaPoderes === 'RACA') {
        poderesFiltrados = poderesRacaPesquisa
      }
      if (categoriaPoderes === 'CLASSE') {
        poderesFiltrados = poderesClassePesquisa
      }
    }

    return poderesFiltrados
  }, [poderesDefault, categoriaPoderes, poderesClassePesquisa, poderesRacaPesquisa])

  const selecionarRaca = (event: { target: { value: SetStateAction<string> } }): void => {
    setRacaPoderes(event.target.value)
  }

  const selecionarClasse = (event: { target: { value: SetStateAction<string> } }): void => {
    setClassePoderes(event.target.value)
  }

  const selecionarCategoriaPoderes = (event: {
    target: { value: SetStateAction<string> }
  }): void => {
    setCategoriaPoderes(event.target.value)
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
          {progressaoPersonagem
            .sort((a, b) => a.nivel + b.nivel)
            .map((progressao) => (
              <>
                {progressao.poderes.map((poder) => (
                  <CardPoder nivel={progressao.nivel} poder={poder} key={poder.key} />
                ))}
              </>
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
                  setCategoriaPoderes('CLASSE')
                  dispatch(abrirModal(`PODERES_LOJA_MODAL`))
                }}
                icone="./icons/busca.svg"
              />
            </>
          }
          css="poderes"
        >
          {niveis &&
            niveis
              .sort((a, b) => a.valor + b.valor)
              .map((nivel) => (
                <>
                  {nivel.poderes
                    .filter((poder) => poder.categoria === 'classe')
                    .map((poder) => (
                      <CardPoder
                        nivel={nivel.valor}
                        key={poder.id}
                        poder={poder}
                        onInteract={() => removerPoder.mutate(poder.id)}
                        iconeBotaoInteracao="./icons/delete.svg"
                      />
                    ))}
                </>
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
          {niveis &&
            niveis
              .sort((a, b) => a.valor + b.valor)
              .map((nivel) => (
                <>
                  {nivel.poderes
                    .filter((poder) => poder.categoria === 'origem')
                    .map((poder) => (
                      <CardPoder
                        nivel={nivel.valor}
                        key={poder.id}
                        poder={poder}
                        onInteract={() => removerPoder.mutate(poder.id)}
                        iconeBotaoInteracao="./icons/delete.svg"
                      />
                    ))}
                </>
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
          {niveis &&
            niveis
              .sort((a, b) => a.valor + b.valor)
              .map((nivel) => (
                <>
                  {nivel.poderes
                    .filter((poder) => poder.categoria != 'classe')
                    .map((poder) => (
                      <CardPoder
                        nivel={nivel.valor}
                        key={poder.id}
                        poder={poder}
                        onInteract={() => removerPoder.mutate(poder.id)}
                        iconeBotaoInteracao="./icons/delete.svg"
                      />
                    ))}
                </>
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
                  onInteract={() => adicionarPoder.mutate({ poder, nivelPoder })}
                />
              ))}
          </Modal>,
          document.body
        )}
    </div>
  )
}
