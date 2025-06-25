import { useExibirPersonagemPorId } from '@renderer/hooks/selectors/usePersonagemQuery'
import { RootState } from '@renderer/store/store'
import { JSX, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './ficha-personagem.module.scss'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { SidebarFicha } from '@renderer/templates/sidebar/sidebar-ficha'
import { FichaAtributos } from './ficha-atributos'
import { FichaPoderes } from './ficha-poderes'
import { FichaMagias } from './ficha-magias'

export const FichaPersonagem = (): JSX.Element => {
  const idPersonagem = useSelector((state: RootState) => state.personagem.idPersonagem)
  const { data: personagem } = useExibirPersonagemPorId(idPersonagem)
  const [aba, setAba] = useState('ATRIBUTOS')

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
                <BotaoModular
                  css="botaoExpansivel"
                  icone="./icons/grimorio.svg"
                  onClickEvent={() => setAba('EFEITOS')}
                  estaAtivo={aba == 'EFEITOS' ? true : false}
                  texto={aba == 'EFEITOS' ? 'EFEITOS' : undefined}
                  cor="corSecundaria"
                  font="tormenta20Font"
                />
              </nav>
              {aba == 'ATRIBUTOS' && <FichaAtributos personagem={personagem} />}
              {aba === 'PODERES' && <FichaPoderes personagem={personagem} />}
              {aba === 'MAGIAS' && <FichaMagias />}
              {aba === 'EFEITOS' && <></>}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
