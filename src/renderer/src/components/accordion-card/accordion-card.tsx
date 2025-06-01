import { JSX, ReactNode, useState } from 'react'
import styles from './accordion-card.module.scss'

type AccordionCardProps = {
  titulo: string
  header: ReactNode
  icone?: string
  children: ReactNode
  inicialmenteExpandido: boolean
}
export const AccordionCard = (props: AccordionCardProps): JSX.Element => {
  const [estaExpandido, setEstaExpandido] = useState(props.inicialmenteExpandido)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titulo}>
          {props.icone && <img loading="lazy" src={props.icone} alt={props.titulo} />}
          <div className={styles.nome}>
            <h3 className="tormenta20Font" onClick={() => setEstaExpandido(!estaExpandido)}>
              {props.titulo}
            </h3>
          </div>
        </div>
        {props.header}
      </div>
      {estaExpandido && <div className={styles.conteudo}>{props.children}</div>}
    </div>
  )
}
