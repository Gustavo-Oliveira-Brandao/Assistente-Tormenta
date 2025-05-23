import { IRecurso } from '@renderer/@types/T20 GOTY/IRecurso'
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { JSX, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './barra-recurso.module.scss'

type barraRecursoProps = {
  recurso: IRecurso
}
export const BarraRecurso = ({ recurso }: barraRecursoProps): JSX.Element => {
  const [larguraBarra, setLarguraBarra] = useState(0)
  const dispach = useDispatch()

  useEffect(() => {
    console.log(recurso)
    if (recurso.valorMaximo) {
      if (recurso.valorAtual >= 0) {
        setLarguraBarra((recurso.valorAtual / recurso.valorMaximo) * 100)
      }
      if (recurso.valorAtual < 0) {
        setLarguraBarra(0)
      }
    }
  }, [recurso.valorAtual, recurso.valorMaximo])

  return (
    <>
      <div
        onClick={() => dispach(abrirModal(`RECURSO_${recurso.categoria}_EDICAO_MODAL`))}
        className={styles.barraRecurso}
      >
        <div
          className={`${styles[recurso.categoria]} ${styles.barra}`}
          style={{ width: `${larguraBarra}%` }}
        ></div>
        <div className={styles.texto}>
          <p className="tormenta20Font">{recurso.valorAtual + '/' + recurso.valorMaximo}</p>
        </div>
      </div>
    </>
  )
}
