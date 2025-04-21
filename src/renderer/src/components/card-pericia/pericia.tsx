import styles from './pericia.module.scss'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { IPericia } from '@renderer/@types/t20/Pericia'
import BotaoModular from '../botao-modular/botao-modular'
import { rolarDados } from '@renderer/utils/rodarDados'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { PericiaForm } from '../forms/pericia-form'

interface PericiaProps {
  pericia: IPericia
  css: string
}

const Pericia = ({ pericia, css }: PericiaProps): JSX.Element => {
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  return (
    <>
      <div className={`${styles[css]} ${styles.padrao}`}>
        <button
          className={styles.titulo}
          onClick={() => dispatch(abrirModal(`PERICIA_${pericia.nome}_EDICAO_MODAL`))}
        >
          <p className={styles.nome}>{pericia.nome}</p>
        </button>
        <div className={styles.rolagem}>
          {css !== 'sidebar' && <p className={styles.treinamento}>{pericia.treinamento}</p>}
          <BotaoModular
            css="rollBtn"
            icone="./icons/dados/d20.svg"
            onClickEvent={() => rolarDados()}
            texto={pericia.valor}
          />
        </div>
      </div>
      {modalAberto === `PERICIA_${pericia.nome}_EDICAO_MODAL` &&
        createPortal(
          <Modal titulo={pericia.nome} onClose={() => dispatch(fecharModal())} height="fit-content">
            <PericiaForm pericia={pericia} />
          </Modal>,
          document.body
        )}
    </>
  )
}

export default Pericia
