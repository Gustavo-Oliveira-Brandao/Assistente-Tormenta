import { JSX, ReactNode } from 'react'
import styles from './accordion-card.module.scss'
import { Accordion } from '@base-ui-components/react'

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
  return (
    <Accordion.Item className={styles.card}>
      <div className={styles.header}>
        <Accordion.Header>
          <Accordion.Trigger className={styles.titulo}>
            {props.numero && <p className={`${styles.valor} tormenta20Font`}>{props.numero}</p>}
            {props.icone && <img loading="lazy" src={props.icone} alt={props.titulo} />}
            <div className={styles.nome}>
              <h3 className="tormenta20Font">{props.titulo}</h3>
              {props.subtitulo && <h4 className="tormenta20Font">{props.subtitulo}</h4>}
            </div>
          </Accordion.Trigger>
        </Accordion.Header>
        {props.header}
      </div>
      <Accordion.Panel className={styles.conteudo}>{props.children}</Accordion.Panel>
    </Accordion.Item>
  )
}
