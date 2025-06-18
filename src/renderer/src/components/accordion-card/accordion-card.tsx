import { JSX, ReactNode, useState } from 'react'
import styles from './accordion-card.module.scss'

type AccordionCardProps = {
  titulo: string
  subtitulo?: string
  header: ReactNode
  icone?: string
  children: ReactNode
  inicialmenteExpandido: boolean
  numero?: number
}
export const AccordionCard = (props: AccordionCardProps): JSX.Element => {
  const [estaExpandido, setEstaExpandido] = useState(props.inicialmenteExpandido)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titulo}>
          {props.numero && <p className={`${styles.valor} tormenta20Font`}>{props.numero}</p>}
          {props.icone && <img loading="lazy" src={props.icone} alt={props.titulo} />}
          <div className={styles.nome} onClick={() => setEstaExpandido(!estaExpandido)}>
            <h3 className="tormenta20Font">{props.titulo}</h3>
            {props.subtitulo && <h4 className="tormenta20Font">{props.subtitulo}</h4>}
          </div>
        </div>
        {props.header}
      </div>
      {estaExpandido && <div className={styles.conteudo}>{props.children}</div>}
    </div>
  )
}
