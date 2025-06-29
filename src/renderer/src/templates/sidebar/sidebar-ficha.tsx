import { JSX } from 'react'
import styles from './sidebar-ficha.module.scss'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { FotoPersonagem } from '@renderer/components/foto-personagem/foto-personagem'
import { BarraRecurso } from '@renderer/components/barra-recurso/barra-recurso'

type SidebarFichaProps = {
  personagem: IPersonagem
}

export const SidebarFicha = ({ personagem }: SidebarFichaProps): JSX.Element => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.personagemInfo}>
        <FotoPersonagem personagem={personagem} />
        <div className={styles.personagemChamada}>
          <div className={styles.personagemNome}>
            <p className={`tormenta20Font`}>{personagem.nome}</p>
          </div>
          <div className={styles.personagemNivel}>
            <img src="./icons/upgrade.svg" alt="nivel" />
            <p className="tormenta20Font">{personagem.nivelAtual}</p>
          </div>
        </div>
        <div className={styles.recursos}>
          {personagem.recursos
            .filter((recurso) => recurso.categoria == 'vida' || recurso.categoria == 'mana')
            .map((recurso) => (
              <BarraRecurso
                key={recurso.id}
                css={recurso.categoria}
                valorAtual={recurso.valorAtual}
                valorMaximo={recurso.valorMaximo ?? 0}
              />
            ))}
        </div>
      </div>
    </aside>
  )
}
