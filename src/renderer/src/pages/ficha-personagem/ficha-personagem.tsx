import { useExibirPersonagemPorId } from '@renderer/hooks/selectors/usePersonagemQuery'
import { JSX, useState } from 'react'
import styles from './ficha-personagem.module.scss'
import { SidebarFicha } from '@renderer/templates/sidebar/sidebar-ficha'
import { FichaAtributos } from './ficha-atributos'
import { FichaPoderes } from './ficha-poderes'
import { FichaMagias } from './ficha-magias'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { FichaEfeitos } from './ficha-efeitos'
import { useParams } from 'react-router-dom'

export const FichaPersonagem = (): JSX.Element => {
  const params = useParams()
  const { data: personagem } = useExibirPersonagemPorId(Number(params.id))
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
                  onClickEvent={() => setAba('ATRIBUTOS')}
                  estaAtivo={aba == 'ATRIBUTOS' ? true : false}
                  cor="cinzaEscuro02"
                  font="tormenta20Font"
                >
                  <img src="./icons/arsenal.svg" alt="Atributos" />
                  {aba == 'ATRIBUTOS' && <p>Atributos</p>}
                </BotaoModular>
                <BotaoModular
                  css="botaoExpansivel"
                  onClickEvent={() => setAba('PODERES')}
                  estaAtivo={aba == 'PODERES' ? true : false}
                  cor="cinzaEscuro02"
                  font="tormenta20Font"
                >
                  <img src="./icons/thyatis.svg" alt="poderes" />
                  {aba == 'PODERES' && <p>Poderes</p>}
                </BotaoModular>
                <BotaoModular
                  css="botaoExpansivel"
                  onClickEvent={() => setAba('MAGIAS')}
                  estaAtivo={aba == 'MAGIAS' ? true : false}
                  cor="cinzaEscuro02"
                  font="tormenta20Font"
                >
                  <img src="./icons/tanna-toh.svg" alt="magias" />
                  {aba == 'MAGIAS' && <p>Magias</p>}
                </BotaoModular>
                <BotaoModular
                  css="botaoExpansivel"
                  onClickEvent={() => setAba('EFEITOS')}
                  estaAtivo={aba == 'EFEITOS' ? true : false}
                  cor="cinzaEscuro02"
                  font="tormenta20Font"
                >
                  <img src="./icons/grimorio.svg" alt="efeitos" />
                  {aba == 'EFEITOS' && <p>Efeitos</p>}
                </BotaoModular>
              </nav>
              {aba == 'ATRIBUTOS' && <FichaAtributos personagem={personagem} />}
              {aba === 'PODERES' && <FichaPoderes personagem={personagem} />}
              {aba === 'MAGIAS' && <FichaMagias personagem={personagem} />}
              {aba === 'EFEITOS' && <FichaEfeitos personagem={personagem} />}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
