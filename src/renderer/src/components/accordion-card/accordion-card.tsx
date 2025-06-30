import { JSX, ReactNode } from 'react'
import styles from './accordion-card.module.scss'
import { Button, Disclosure, DisclosurePanel, Heading } from 'react-aria-components'

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
    <Disclosure className={styles.card}>
      <div className={styles.header}>
        <Heading className={styles.titulo}>
          {props.numero && <p className={`${styles.valor} tormenta20Font`}>{props.numero}</p>}
          {props.icone && <img loading="lazy" src={props.icone} alt={props.titulo} />}
          <Button slot="trigger" className={styles.nome}>
            <h3 className="tormenta20Font">{props.titulo}</h3>
            {props.subtitulo && <h4 className="tormenta20Font">{props.subtitulo}</h4>}
          </Button>
        </Heading>
        {props.header}
      </div>
      <DisclosurePanel className={styles.conteudo}>{props.children}</DisclosurePanel>
    </Disclosure>
  )
}
