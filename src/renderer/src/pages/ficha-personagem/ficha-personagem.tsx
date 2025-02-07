import SidebarFicha from '@renderer/templates/sidebar-ficha/sidebar-ficha'
import styles from './ficha-personagem.module.scss'
import { useExibirPersonagemQuery } from '@renderer/hooks/useExibirPersonagemQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useRemoverPoderMutation } from '@renderer/hooks/useRemoverPoderMutation'
import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import { useState } from 'react'
import SecaoFicha from '@renderer/templates/secao-ficha/secao-ficha'
import CardAtributo from '@renderer/components/card-atributo/card-atributo'
import CardPericia from '@renderer/components/card-pericia/card-pericia'
import CardPoder from '@renderer/components/card-item/card-poder'

const FichaPersonagem = ({ idPersonagem }: { idPersonagem: number }): JSX.Element => {
  const { data: personagem } = useExibirPersonagemQuery(idPersonagem)
  const queryClient = useQueryClient()
  const [aba, setAba] = useState('atributos')
  const [modal, setModal] = useState<string | null>(null)

  console.log(modal)
  const removerPoder = useRemoverPoderMutation(queryClient)

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
                  icone="./icons/default/acoes.svg"
                  onClickEvent={() => setAba('acoes')}
                  estaAtivo={aba == 'acoes' ? true : false}
                  texto={aba == 'acoes' ? 'acoes' : undefined}
                />
                <BotaoModular
                  css="botaoNav"
                  icone="./icons/default/grimorio.svg"
                  onClickEvent={() => setAba('grimorio')}
                  estaAtivo={aba == 'grimorio' ? true : false}
                  texto={aba == 'grimorio' ? 'grimorio' : undefined}
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
                  <SecaoFicha header={<h2>Conhecimento</h2>} css="pericias">
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'conhecimento')
                      .map((pericia) => (
                        <CardPericia key={pericia.id} pericia={pericia} css="pericia" />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha header={<h2>Oficio</h2>} css="pericias">
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'oficio')
                      .map((pericia) => (
                        <CardPericia key={pericia.id} pericia={pericia} css="pericia" />
                      ))}
                  </SecaoFicha>
                </>
              )}
              {aba == 'acoes' && (
                <SecaoFicha header={<h2>Ações</h2>} css="conteudo">
                  <div></div>
                </SecaoFicha>
              )}
              {aba == 'grimorio' && (
                <SecaoFicha
                  header={
                    <>
                      <h2>Grimório</h2>
                      <BotaoModular
                        css="botaoAdicionar"
                        texto="Adicionar magias"
                        onClickEvent={() => setModal('adicionar.magia')}
                        icone="./icons/plus-solid.svg"
                      />
                    </>
                  }
                  css="conteudo"
                >
                  <div></div>
                </SecaoFicha>
              )}
              {aba == 'poderes' && (
                <SecaoFicha
                  header={
                    <>
                      <h2>Poderes</h2>
                      <BotaoModular
                        css="botaoAdicionar"
                        texto="Adicionar poderes"
                        onClickEvent={() => setModal('adicionar.poder')}
                        icone="./icons/plus-solid.svg"
                      />
                    </>
                  }
                  css="conteudo"
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
              )}
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default FichaPersonagem
