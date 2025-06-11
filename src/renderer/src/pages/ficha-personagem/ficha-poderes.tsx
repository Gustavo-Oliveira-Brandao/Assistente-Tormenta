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
import { JSX, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeepPartial } from 'typeorm'
import styles from './ficha-personagem.module.scss'

type FichaPoderesProps = {
  personagem: IPersonagem
}

export const FichaPoderes = ({ personagem }: FichaPoderesProps): JSX.Element => {
  const { data: poderesDefault } = useExibirPoderesDefault()
  const { data: niveis } = useExibirProgressaoPersonagem(personagem.id)
  const { data: classes } = useExibirClassesDefault()
  const [abaPoderesPesquisa, setAbaPoderesPesquisa] = useState('CLASSE')

  const [nivelPoder, setNivelPoder] = useState(1)

  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  const poderesClassePesquisa = useMemo(() => {
    if (!classes || !personagem) {
      return []
    }

    return classes.flatMap((classe) => {
      const poderes: DeepPartial<IPoder>[] = []
      if (classe.nome == personagem.classe) {
        poderes.push(...classe.poderesClasse)
      }
      return poderes
    })
  }, [classes, personagem])

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
          }
        }
        progressaoPersonagem.push(nivelProgressao)
      }

      return progressaoPersonagem
    })
  }, [classes, niveis, personagem])

  const poderesPesquisados = useMemo(() => {
    if (!poderesDefault) {
      return []
    }
    let poderesFiltrados: DeepPartial<IPoder>[] = []

    if (abaPoderesPesquisa === 'CLASSE') {
      poderesFiltrados = poderesClassePesquisa
    } else if (abaPoderesPesquisa === 'COMBATE') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'combate')
    } else if (abaPoderesPesquisa === 'DESTINO') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'destino')
    } else if (abaPoderesPesquisa === 'MAGIA') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'magia')
    } else if (abaPoderesPesquisa === 'CONCEDIDOS') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'concedido')
    } else if (abaPoderesPesquisa === 'TORMENTA') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'tormenta')
    } else if (abaPoderesPesquisa === 'ORIGEM') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'origem')
    }
    return poderesFiltrados
  }, [poderesDefault, abaPoderesPesquisa, poderesClassePesquisa])

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
                  setAbaPoderesPesquisa('CLASSE')
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
                  setAbaPoderesPesquisa('ORIGEM')
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
                  setAbaPoderesPesquisa('COMBATE')
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
                  <BotaoModular
                    css="botaoFiltro"
                    estaAtivo={abaPoderesPesquisa === 'CLASSE' ? true : false}
                    cor="corPrimaria"
                    texto="Classe"
                    font="tormenta20Font"
                    onClickEvent={() => setAbaPoderesPesquisa('CLASSE')}
                  />

                  <BotaoModular
                    css="botaoFiltro"
                    estaAtivo={abaPoderesPesquisa === 'ORIGEM' ? true : false}
                    cor="corPrimaria"
                    texto="Origem"
                    font="tormenta20Font"
                    onClickEvent={() => setAbaPoderesPesquisa('ORIGEM')}
                  />

                  <BotaoModular
                    css="botaoFiltro"
                    estaAtivo={abaPoderesPesquisa === 'COMBATE' ? true : false}
                    cor="corPrimaria"
                    texto="Combate"
                    font="tormenta20Font"
                    onClickEvent={() => setAbaPoderesPesquisa('COMBATE')}
                  />

                  <BotaoModular
                    css="botaoFiltro"
                    estaAtivo={abaPoderesPesquisa === 'DESTINO' ? true : false}
                    cor="corPrimaria"
                    texto="Destino"
                    font="tormenta20Font"
                    onClickEvent={() => setAbaPoderesPesquisa('DESTINO')}
                  />

                  <BotaoModular
                    css="botaoFiltro"
                    estaAtivo={abaPoderesPesquisa === 'CONCEDIDOS' ? true : false}
                    cor="corPrimaria"
                    texto="Concedidos"
                    font="tormenta20Font"
                    onClickEvent={() => setAbaPoderesPesquisa('CONCEDIDOS')}
                  />

                  <BotaoModular
                    css="botaoFiltro"
                    estaAtivo={abaPoderesPesquisa === 'MAGIA' ? true : false}
                    cor="corPrimaria"
                    texto="Magia"
                    font="tormenta20Font"
                    onClickEvent={() => setAbaPoderesPesquisa('MAGIA')}
                  />

                  <BotaoModular
                    css="botaoFiltro"
                    estaAtivo={abaPoderesPesquisa === 'TORMENTA' ? true : false}
                    cor="corPrimaria"
                    texto="Tormenta"
                    font="tormenta20Font"
                    onClickEvent={() => setAbaPoderesPesquisa('TORMENTA')}
                  />
                </div>
              </>
            }
          >
            <>
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
            </>
          </Modal>,
          document.body
        )}
    </div>
  )
}
