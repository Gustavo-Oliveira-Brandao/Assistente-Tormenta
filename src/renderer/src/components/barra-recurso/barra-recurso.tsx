import { useState } from 'react'
import styles from './barra-recurso.module.scss'

const BarraRecurso = ({
  css,
  atual,
  maximo
}: {
  css: string
  atual: number
  maximo: number
}): JSX.Element => {
  const [larguraBarra, setLarguraBarra] = useState(0)
  console.log(setLarguraBarra)
  return (
    <div className={styles.barraRecurso}>
      <div className={`${styles[css]} ${styles.barra}`} style={{ width: `${larguraBarra}%` }}></div>
      <div className={styles.texto}>
        <p>{atual + '/' + maximo}</p>
      </div>
    </div>
  )
}

export default BarraRecurso
