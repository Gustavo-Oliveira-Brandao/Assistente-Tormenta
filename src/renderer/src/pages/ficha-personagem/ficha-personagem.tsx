import SidebarFicha from '@renderer/templates/sidebar-ficha/sidebar-ficha'
import styles from './ficha-personagem.module.scss'
import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import { useState } from 'react'
import SecaoFicha from '@renderer/templates/secao-ficha/secao-ficha'
import CardAtributo from '@renderer/components/card-atributo/card-atributo'
import CardPericia from '@renderer/components/card-pericia/card-pericia'
import CardPoder from '@renderer/components/card-poder/card-poder'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { useExibirPersonagemPorIdQuery } from '@renderer/hooks/queries/personagem/useExibirPersonagemPorIdQuery'
import { useExibirLojaPoderesQuery } from '@renderer/hooks/queries/poder/useExibirLojaPoderesQuery'
import { useAdicionarPoderMutation } from '@renderer/hooks/mutations/poder/useAdicionarPoderMutation'
import { useRemoverPoderMutation } from '@renderer/hooks/mutations/poder/useRemoverPoderMutation'

const FichaPersonagem = ({ idPersonagem }: { idPersonagem: number }): JSX.Element => {
  const { data: personagem } = useExibirPersonagemPorIdQuery(idPersonagem)
  const { data: poderesDefault } = useExibirLojaPoderesQuery()

  const [aba, setAba] = useState('atributos')
  const [loja, setLoja] = useState<string | null>(null)

  const adicionarPoder = useAdicionarPoderMutation()
  const removerPoder = useRemoverPoderMutation()
  //TODO: Bota um botão de voltar para a tela anterior cara
  //TODO: Criação de modal para exibição de edição de elementos na ficha
  return (
    <main>
      {personagem && (
        <>
          <div className={styles.ficha}>
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
              </nav>
              {aba == 'atributos' && (
                <>
                  <SecaoFicha header={<h2>Atributos</h2>} css="atributos">
                    {personagem.atributos.map((atributo) => (
                      <CardAtributo key={atributo.id} atributo={atributo} />
                    ))}
                  </SecaoFicha>
                  <SecaoFicha header={<h2>Pericias de combate</h2>} css="pericias">
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'combate')
                      .map((pericia) => (
                        <CardPericia key={pericia.id} pericia={pericia} css="pericia" />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha header={<h2>Testes de resistência</h2>} css="pericias">
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'testeResistencia')
                      .map((pericia) => (
                        <CardPericia key={pericia.id} pericia={pericia} css="pericia" />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha header={<h2>Pericias gerais</h2>} css="pericias">
                    {personagem.pericias
                      .filter(
                        (pericia) => pericia.nome !== 'iniciativa' && pericia.categoria === 'geral'
                      )
                      .map((pericia) => (
                        <CardPericia key={pericia.id} pericia={pericia} css="pericia" />
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
                          onClickEvent={() => setLoja('adicionar.poder')}
                          icone="./icons/plus-solid.svg"
                        />
                      </>
                    }
                    css="poderes"
                  >
                    {personagem.poderes.map((poder) => (
                      <CardPoder
                        key={poder.id}
                        poder={poder}
                        onInteract={() => removerPoder.mutate(poder.id)}
                        iconeBotaoInteracao="./icons/delete.svg"
                      />
                    ))}
                  </SecaoFicha>
                  {loja === 'adicionar.poder' &&
                    createPortal(
                      <Modal
                        titulo="Adquirir poderes"
                        onClose={() => setLoja(null)}
                        height={'400px'}
                      >
                        {poderesDefault &&
                          poderesDefault.map((poder) => (
                            <CardPoder
                              key={poder.id}
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
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default FichaPersonagem
