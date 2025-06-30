import { JSX, useEffect, useState } from 'react'
import styles from './barra-recurso.module.scss'

type BarraRecursoProps = {
  valorAtual: number
  valorMaximo: number
  categoria: string
  valorTemporario?: number
}

export const BarraRecurso = (props: BarraRecursoProps): JSX.Element => {
  const [larguraBarra, setLarguraBarra] = useState(0)

  useEffect(() => {
    if (props.valorMaximo) {
      if (props.valorAtual >= 0) {
        setLarguraBarra((props.valorAtual / props.valorMaximo) * 100)
      }
    }
  }, [props.valorAtual, props.valorMaximo])

  const calcularCorRecurso = (): string => {
    if (larguraBarra == 100) {
      return `${props.categoria}Full`
    }
    if (larguraBarra > 75) {
      return `${props.categoria}Full`
    }
    if (larguraBarra > 25) {
      return `${props.categoria}AboveHalf`
    }
    return `${props.categoria}AlmostEmpty`
  }

  return (
    <div className={styles.barraWrapper}>
      {larguraBarra == 0 ? (
        <div className={`${styles.texto} tormenta20Font`}>Morto</div>
      ) : (
        <div className={`${styles.texto} tormenta20Font`}>
          {props.valorAtual}/{props.valorMaximo}
        </div>
      )}
      <div
        className={`${styles.barra} ${styles[calcularCorRecurso()]} tormenta20Font`}
        style={{ width: `${larguraBarra}%` }}
      ></div>
    </div>
  )
}
