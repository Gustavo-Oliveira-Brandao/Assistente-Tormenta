import { abrirModal } from '@renderer/store/slices/modalSlice'
import { JSX, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './barra-progressao.module.scss'

type barraProgressaoProps = {
  valorAtual: number
  valorMaximo: number
  categoria: string
  height: string
}
export const BarraProgressao = ({
  valorAtual,
  valorMaximo,
  categoria,
  height
}: barraProgressaoProps): JSX.Element => {
  const [larguraBarra, setLarguraBarra] = useState(0)
  const dispach = useDispatch()

  useEffect(() => {
    if (valorMaximo) {
      if (valorAtual >= 0) {
        setLarguraBarra((valorAtual / valorMaximo) * 100)
      }
    }
  }, [valorAtual, valorMaximo])

  return (
    <div
      onClick={() => dispach(abrirModal(`${categoria}_EDICAO_MODAL`))}
      className={styles.barraProgressao}
      style={{ height: height }}
    >
      <div
        className={`${styles[categoria]} ${styles.barra}`}
        style={{ width: `${larguraBarra}%` }}
      ></div>
      <div className={styles.texto}>
        <p className="tormenta20Font">{valorAtual + '/' + valorMaximo}</p>
      </div>
    </div>
  )
}
