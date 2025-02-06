import { ReactNode } from 'react'
import styles from './secao-ficha.module.scss'
import classNames from 'classnames'

const SecaoFicha = ({
  header,
  children,
  css
}: {
  header: ReactNode
  children: ReactNode
  css: string
}): JSX.Element => {
  const conteudoCss = classNames(styles[css])
  return (
    <section className={styles.secao}>
      <div className={styles.titulo}>{header}</div>
      <div className={conteudoCss}>{children}</div>
    </section>
  )
}

export default SecaoFicha
