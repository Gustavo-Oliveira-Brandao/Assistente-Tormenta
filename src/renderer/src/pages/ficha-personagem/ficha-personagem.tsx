import SidebarFicha from '@renderer/templates/sidebar-ficha/sidebar-ficha'
import styles from './ficha-personagem.module.scss'
import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import { useState } from 'react'
import SecaoFicha from '@renderer/templates/secao-ficha/secao-ficha'
import CardPoder from '@renderer/components/card-poder/card-poder'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { useExibirPersonagemPorIdQuery } from '@renderer/hooks/queries/personagem/useExibirPersonagemPorIdQuery'
import { useExibirLojaPoderesQuery } from '@renderer/hooks/queries/poder/useExibirLojaPoderesQuery'
import { useAdicionarPoderMutation } from '@renderer/hooks/mutations/poder/useAdicionarPoderMutation'
import { useRemoverPoderMutation } from '@renderer/hooks/mutations/poder/useRemoverPoderMutation'
import CardMagia from '@renderer/components/card-magia/card-magia'
import { useExibirLojaMagiasQuery } from '@renderer/hooks/queries/magia/useExibirLojaMagiasQuery'
import { useAdicionarMagiaMutation } from '@renderer/hooks/mutations/magia/useAdicionarMagiaMutation'
import { useRemoverMagiaMutation } from '@renderer/hooks/mutations/magia/useRemoverMagiaMutation'
import { useExbirMagiasPersonagemQuery } from '@renderer/hooks/queries/magia/useExbirMagiasPersonagemQuery'
import { useExibirPoderesPersonagemQuery } from '@renderer/hooks/queries/poder/useExibirPoderesPersonagemQuery'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import Atributo from '@renderer/components/card-atributo/atributo'
import Pericia from '@renderer/components/card-pericia/pericia'

const FichaPersonagem = (): JSX.Element => {
  const idPersonagem = useSelector((state: RootState) => state.personagem.idPersonagem)

  const { data: personagem } = useExibirPersonagemPorIdQuery(idPersonagem)
  const { data: magias } = useExbirMagiasPersonagemQuery(idPersonagem)
  const { data: poderes } = useExibirPoderesPersonagemQuery(idPersonagem)
  const { data: poderesDefault } = useExibirLojaPoderesQuery()
  const { data: magiasDefault } = useExibirLojaMagiasQuery()

  const [aba, setAba] = useState('atributos')

  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  const adicionarPoder = useAdicionarPoderMutation()
  const removerPoder = useRemoverPoderMutation()
  const adicionarMagia = useAdicionarMagiaMutation()
  const removerMagia = useRemoverMagiaMutation()
  //TODO: Bota um botão de voltar para a tela anterior cara
  //TODO: Trazer melhorias de UI/UX para as abas poderes e magias
  return (
    <main>
      {personagem && (
        <>
          <section className={styles.ficha}>
            <SidebarFicha personagem={personagem} />
            <div className={styles.conteudo}>
              <nav className={styles.navButtons}>
                <BotaoModular
                  css="botaoNav"
                  icone="./icons/default/atributos.svg"
                  onClickEvent={() => setAba('atributos')}
                  estaAtivo={aba == 'atributos' ? true : false}
                  texto={aba == 'atributos' ? 'atributos' : undefined}
                />
                <BotaoModular
                  css="botaoNav"
                  icone="./icons/default/poderes.svg"
                  onClickEvent={() => setAba('poderes')}
                  estaAtivo={aba == 'poderes' ? true : false}
                  texto={aba == 'poderes' ? 'poderes' : undefined}
                />
                <BotaoModular
                  css="botaoNav"
                  icone="./icons/spell-book.svg"
                  onClickEvent={() => setAba('magias')}
                  estaAtivo={aba == 'magias' ? true : false}
                  texto={aba == 'magias' ? 'magias' : undefined}
                />
              </nav>
              {aba == 'atributos' && (
                <>
                  <SecaoFicha header={<h2>Atributos</h2>} css="atributos">
                    {personagem.atributos
                      .sort((a, b) => a.ordem - b.ordem)
                      .map((atributo) => (
                        <Atributo key={atributo.id} atributo={atributo} />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha header={<h2>Pericias de combate</h2>} css="pericias">
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'combate')
                      .map((pericia) => (
                        <Pericia key={pericia.id} pericia={pericia} css="pericia" />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha header={<h2>Testes de resistência</h2>} css="pericias">
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'testeResistencia')
                      .map((pericia) => (
                        <Pericia key={pericia.id} pericia={pericia} css="pericia" />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha header={<h2>Pericias gerais</h2>} css="pericias">
                    {personagem.pericias
                      .filter(
                        (pericia) => pericia.nome !== 'iniciativa' && pericia.categoria === 'geral'
                      )
                      .map((pericia) => (
                        <Pericia key={pericia.id} pericia={pericia} css="pericia" />
                      ))}
                  </SecaoFicha>
                </>
              )}
              {aba == 'poderes' && (
                <>
                  <SecaoFicha
                    header={
                      <>
                        <h2>Poderes</h2>
                        <BotaoModular
                          css="botaoAdicionar"
                          texto="Adicionar poderes"
                          onClickEvent={() => dispatch(abrirModal(`PODERES_LOJA_MODAL`))}
                          icone="./icons/plus-solid.svg"
                        />
                      </>
                    }
                    css="poderes"
                  >
                    {poderes &&
                      poderes.map((poder) => (
                        <CardPoder
                          key={poder.id}
                          poder={poder}
                          onInteract={() => removerPoder.mutate(poder.id)}
                          iconeBotaoInteracao="./icons/delete.svg"
                        />
                      ))}
                  </SecaoFicha>
                  {modalAberto === 'PODERES_LOJA_MODAL' &&
                    createPortal(
                      <Modal
                        titulo="Adquirir poderes"
                        onClose={() => dispatch(fecharModal())}
                        height={'400px'}
                      >
                        {poderesDefault &&
                          poderesDefault.map((poder, index) => (
                            <CardPoder
                              key={index}
                              poder={poder}
                              onInteract={() => adicionarPoder.mutate({ poder, idPersonagem })}
                              iconeBotaoInteracao="./icons/plus-solid.svg"
                            />
                          ))}
                      </Modal>,
                      document.body
                    )}
                </>
              )}
              {aba == 'magias' && (
                <>
                  <SecaoFicha
                    header={
                      <>
                        <h2>Magias</h2>
                        <BotaoModular
                          css="botaoAdicionar"
                          texto="adicionar magias"
                          onClickEvent={() => dispatch(abrirModal(`MAGIAS_LOJA_MODAL`))}
                          icone="./icons/plus-solid.svg"
                        />
                      </>
                    }
                    css="poderes"
                  >
                    {magias &&
                      magias.map((magia) => (
                        <CardMagia
                          key={magia.id}
                          magia={magia}
                          onInteract={() => removerMagia.mutate(magia.id)}
                          iconeBotaoInteracao="./icons/delete.svg"
                        />
                      ))}
                  </SecaoFicha>
                  {modalAberto === 'MAGIAS_LOJA_MODAL' &&
                    createPortal(
                      <Modal
                        titulo="Adquirir magias"
                        onClose={() => dispatch(fecharModal())}
                        height="400px"
                      >
                        {magiasDefault &&
                          magiasDefault.map((magia, index) => (
                            <CardMagia
                              key={index}
                              magia={magia}
                              onInteract={() => adicionarMagia.mutate({ magia, idPersonagem })}
                              iconeBotaoInteracao="./icons/plus-solid.svg"
                            />
                          ))}
                      </Modal>,
                      document.body
                    )}
                </>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default FichaPersonagem
