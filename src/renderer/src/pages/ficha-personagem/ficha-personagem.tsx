import { useExibirPersonagemPorId } from '@renderer/hooks/selectors/usePersonagemQuery'
import { RootState } from '@renderer/store/store'
import { JSX, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ficha-personagem.module.scss'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { createPortal } from 'react-dom'
import { Modal } from '@renderer/templates/modal/modal'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { Pericia } from '@renderer/components/pericia/pericia'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { useExibirMagiasDefault } from '@renderer/hooks/selectors/useMagiaQuery'
import { CardMagia } from '@renderer/components/card-magia/card-magia'
import { useDeletarMagia } from '@renderer/hooks/mutations/useMagiaMutation'
import { SidebarFicha } from '@renderer/templates/sidebar/sidebar-ficha'

export const FichaPersonagem = (): JSX.Element => {
  const idPersonagem = useSelector((state: RootState) => state.personagem.idPersonagem)

  const { data: personagem } = useExibirPersonagemPorId(idPersonagem)
  const { data: magiasDefault } = useExibirMagiasDefault()
  const removerMagia = useDeletarMagia()
  const [aba, setAba] = useState('ATRIBUTOS')
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  return (
    <main>
      {personagem && (
        <>
          <section className={styles.ficha}>
            <SidebarFicha personagem={personagem} />
            <div className={styles.conteudo}>
              <nav className={styles.navButtons}>
                <BotaoModular
                  css="botaoExpansivel"
                  icone="./icons/arsenal.svg"
                  onClickEvent={() => setAba('ATRIBUTOS')}
                  estaAtivo={aba == 'ATRIBUTOS' ? true : false}
                  texto={aba == 'ATRIBUTOS' ? 'ATRIBUTOS' : undefined}
                  cor="corSecundaria"
                  font="tormenta20Font"
                />
                <BotaoModular
                  css="botaoExpansivel"
                  icone="./icons/thyatis.svg"
                  onClickEvent={() => setAba('PODERES')}
                  estaAtivo={aba == 'PODERES' ? true : false}
                  texto={aba == 'PODERES' ? 'PODERES' : undefined}
                  cor="corSecundaria"
                  font="tormenta20Font"
                />
                <BotaoModular
                  css="botaoExpansivel"
                  icone="./icons/tanna-toh.svg"
                  onClickEvent={() => setAba('MAGIAS')}
                  estaAtivo={aba == 'MAGIAS' ? true : false}
                  texto={aba == 'MAGIAS' ? 'MAGIAS' : undefined}
                  cor="corSecundaria"
                  font="tormenta20Font"
                />
              </nav>
              {aba == 'ATRIBUTOS' && (
                <>
                  <SecaoFicha
                    header={<h2 className="tormenta20Font">Atributos</h2>}
                    css="atributos"
                  >
                    {personagem.atributos
                      .sort((a, b) => a.ordem - b.ordem)
                      .map((atributo) => (
                        <div className={styles.atributo} key={atributo.id}>
                          <div className={styles.titulo}>
                            <BotaoModular
                              font="tormenta20Font"
                              onClickEvent={() =>
                                dispatch(abrirModal(`ATRIBUTO_${atributo.nome}_EDICAO_MODAL`))
                              }
                              texto={atributo.nome}
                              css="simples"
                              cor="transparente"
                            />
                          </div>
                          <BotaoModular
                            css="rollBtn"
                            cor="transparente"
                            icone="./icons/d20 cinza.svg"
                            onClickEvent={() => console.log('teste')}
                            font="tormenta20Font"
                            texto={atributo.valorBase}
                          />
                          {modalAberto === `ATRIBUTO_${atributo.nome}_EDICAO_MODAL` &&
                            createPortal(
                              <Modal
                                titulo={atributo.nome}
                                onClose={() => dispatch(fecharModal())}
                                height="fit-content"
                                width="400px"
                              >
                                <></>
                              </Modal>,
                              document.body
                            )}
                        </div>
                      ))}
                  </SecaoFicha>
                  <SecaoFicha
                    header={<h2 className="tormenta20Font">Pericias de combate</h2>}
                    css="pericias"
                  >
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'combate')
                      .map((pericia) => (
                        <Pericia
                          key={pericia.id}
                          pericia={pericia}
                          exibeTreinamento={true}
                          editavel={true}
                        />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha
                    header={<h2 className="tormenta20Font">Testes de resistência</h2>}
                    css="pericias"
                  >
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'testeResistencia')
                      .map((pericia) => (
                        <Pericia
                          key={pericia.id}
                          pericia={pericia}
                          exibeTreinamento={true}
                          editavel={true}
                        />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha
                    header={<h2 className="tormenta20Font">Pericias gerais</h2>}
                    css="pericias"
                  >
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'geral')
                      .map((pericia) => (
                        <Pericia
                          key={pericia.id}
                          pericia={pericia}
                          exibeTreinamento={true}
                          editavel={true}
                        />
                      ))}
                  </SecaoFicha>
                </>
              )}
              {aba === 'MAGIAS' && (
                <>
                  <SecaoFicha
                    header={
                      <>
                        <h2 className="tormenta20Font">Magias</h2>
                        <BotaoModular
                          css="minimalista"
                          texto="Buscar magias"
                          cor="transparente"
                          font="tormenta20Font"
                          onClickEvent={() => dispatch(abrirModal(`MAGIAS_LOJA_MODAL`))}
                          icone="./icons/busca.svg"
                        />
                      </>
                    }
                    css="poderes"
                  >
                    {magiasDefault &&
                      magiasDefault.map((magia, index) => (
                        <CardMagia
                          key={index}
                          magia={magia}
                          iconeBotaoInteracao="./icons/delete.svg"
                          onInteract={() => removerMagia.mutate(magia.key)}
                        />
                      ))}
                  </SecaoFicha>
                  {modalAberto === 'MAGIAS_LOJA_MODAL' &&
                    createPortal(
                      <Modal
                        titulo="Adicionar magias"
                        onClose={() => dispatch(fecharModal())}
                        height="400px"
                        width="550px"
                      >
                        {magiasDefault &&
                          magiasDefault.map((magia, index) => (
                            <CardMagia
                              key={index}
                              magia={magia}
                              iconeBotaoInteracao="./icons/adicao.svg"
                              onInteract={() => removerMagia.mutate(magia.key)}
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
