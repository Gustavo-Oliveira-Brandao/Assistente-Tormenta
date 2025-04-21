import styles from './atributo.module.scss'
import Modal from '@renderer/templates/modal/modal'
import { createPortal } from 'react-dom'
import { IAtributo } from '@renderer/@types/t20/Atributo'
import BotaoModular from '../botao-modular/botao-modular'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { rolarDados } from '@renderer/utils/rodarDados'
import { AtributoForm } from '../forms/atributo-form'

const Atributo = ({ atributo }: { atributo: IAtributo }): JSX.Element => {
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  return (
    <>
      <div className={styles.atributo}>
        <div className={styles.titulo}>
          <button onClick={() => dispatch(abrirModal(`ATRIBUTO_${atributo.nome}_EDICAO_MODAL`))}>
            {atributo.nome}
          </button>
        </div>
        <BotaoModular
          css="rollBtn"
          icone="./icons/dados/d20.svg"
          texto={atributo.valorAtual}
          onClickEvent={() => rolarDados()}
        />
      </div>
      {modalAberto == `ATRIBUTO_${atributo.nome}_EDICAO_MODAL` &&
        createPortal(
          <Modal
            titulo={atributo.nome}
            onClose={() => dispatch(fecharModal())}
            height="fit-content"
          >
            <AtributoForm atributo={atributo} />
          </Modal>,
          document.body
        )}
    </>
  )
}

export default Atributo
