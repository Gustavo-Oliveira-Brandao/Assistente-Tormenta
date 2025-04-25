import { IRecurso } from '@renderer/@types/t20/Recurso'
import styles from './card-recurso.module.scss'
import BotaoModular from '../botao-modular/botao-modular'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { DefesaForm } from '../forms/defesa-form'
import { DeslocamentoForm } from '../forms/deslocamento-form'

interface RecursoProps {
  recurso: IRecurso
  icone: string
}

export const Recurso = ({ recurso, icone }: RecursoProps): JSX.Element => {
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  return (
    <>
      <div className={styles.recurso}>
        <img src={icone} alt={recurso.categoria} />
        <BotaoModular
          onClickEvent={() => dispatch(abrirModal(`RECURSO_${recurso.categoria}_EDICAO_MODAL`))}
          texto={recurso.valorMaximo}
          css="recursoSecundario"
        />
      </div>
      {modalAberto == `RECURSO_${recurso.categoria}_EDICAO_MODAL` &&
        createPortal(
          <Modal
            width="550px"
            titulo={recurso.categoria}
            onClose={() => dispatch(fecharModal())}
            height="400px"
          >
            {recurso.categoria === 'defesa' && <DefesaForm defesa={recurso} />}
            {recurso.categoria === 'deslocamento' && <DeslocamentoForm deslocamento={recurso} />}
          </Modal>,
          document.body
        )}
    </>
  )
}
