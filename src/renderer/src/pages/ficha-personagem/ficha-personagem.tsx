import { useExibirPersonagemPorId } from '@renderer/hooks/selectors/usePersonagemQuery'
import { JSX, useState } from 'react'
import styles from './ficha-personagem.module.scss'
import { SidebarFicha } from '@renderer/templates/sidebar/sidebar-ficha'
import { FichaAtributos } from './ficha-atributos'
import { FichaPoderes } from './ficha-poderes'
import { FichaMagias } from './ficha-magias'
import { FichaEfeitos } from './ficha-efeitos'
import { useParams } from 'react-router-dom'
import { Button } from 'react-aria-components'

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
                <Button
                  className={`${styles.botaoExpansivel} ${aba == 'ATRIBUTOS' ? styles.ativo : ''}`}
                  onClick={() => setAba('ATRIBUTOS')}
                >
                  <img src="./icons/arsenal.svg" alt="Atributos" />
                  {aba == 'ATRIBUTOS' && <p className="tormenta20Font">Atributos</p>}
                </Button>
                <Button
                  className={`${styles.botaoExpansivel} ${aba == 'PODERES' ? styles.ativo : ''}`}
                  onClick={() => setAba('PODERES')}
                >
                  <img src="./icons/thyatis.svg" alt="poderes" />
                  {aba == 'PODERES' && <p className="tormenta20Font">Poderes</p>}
                </Button>
                <Button
                  className={`${styles.botaoExpansivel} ${aba == 'MAGIAS' ? styles.ativo : ''}`}
                  onClick={() => setAba('MAGIAS')}
                >
                  <img src="./icons/tanna-toh.svg" alt="magias" />
                  {aba == 'MAGIAS' && <p className="tormenta20Font">Magias</p>}
                </Button>
                <Button
                  className={`${styles.botaoExpansivel} ${aba == 'EFEITOS' ? styles.ativo : ''}`}
                  onClick={() => setAba('EFEITOS')}
                >
                  <img src="./icons/grimorio.svg" alt="efeitos" />
                  {aba == 'EFEITOS' && <p className="tormenta20Font">Efeitos</p>}
                </Button>
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
