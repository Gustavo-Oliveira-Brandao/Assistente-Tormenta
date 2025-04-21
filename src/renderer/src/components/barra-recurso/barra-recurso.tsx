import { useEffect, useState } from 'react'
import styles from './barra-recurso.module.scss'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { IRecurso } from '@renderer/@types/t20/Recurso'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { VidaForm } from '../forms/vida-form'
import { ManaForm } from '../forms/mana-form'

const BarraRecurso = ({ recurso }: { recurso: IRecurso }): JSX.Element => {
  const [larguraBarra, setLarguraBarra] = useState(0)
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  useEffect(() => {
    if (recurso.valorAtual >= 0) {
      setLarguraBarra((recurso.valorAtual / recurso.valorMaximo) * 100)
    }
    if (recurso.valorAtual < 0) {
      setLarguraBarra(0)
    }
  }, [recurso.valorAtual, recurso.valorMaximo])

  return (
    <>
      <div
        onClick={() => dispatch(abrirModal(`RECURSO_${recurso.categoria}_EDICAO_MODAL`))}
        className={styles.barraRecurso}
      >
        <div
          className={`${styles[recurso.categoria]} ${styles.barra}`}
          style={{ width: `${larguraBarra}%` }}
        ></div>
        <div className={styles.texto}>
          <p>{recurso.valorAtual + '/' + recurso.valorMaximo}</p>
        </div>
      </div>

      {modalAberto == `RECURSO_${recurso.categoria}_EDICAO_MODAL` &&
        createPortal(
          <Modal
            titulo={recurso.categoria}
            onClose={() => dispatch(fecharModal())}
            height="fit-content"
          >
            {recurso.categoria === 'vida' && <VidaForm vida={recurso} />}
            {recurso.categoria === 'mana' && <ManaForm mana={recurso} />}
          </Modal>,
          document.body
        )}
    </>
  )
}

export default BarraRecurso
