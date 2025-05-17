import { JSX, ReactNode } from 'react'
import styles from './secao-ficha.module.scss'
import classNames from 'classnames'

type SecaoFichaProps = {
  header: ReactNode
  children: ReactNode
  css: string
}

export const SecaoFicha = ({ header, children, css }: SecaoFichaProps): JSX.Element => {
  const conteudoCss = classNames(styles[css])

  return (
    <section className={styles.secao}>
      <div className={styles.titulo}>{header}</div>
      <div className={conteudoCss}>{children}</div>
    </section>
  )
}
