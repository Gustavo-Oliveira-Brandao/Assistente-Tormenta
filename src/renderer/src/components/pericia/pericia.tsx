import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { JSX } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './pericia.module.scss'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { BotaoModular } from '../botao-modular/botao-modular'
import { RootState } from '@renderer/store/store'
import { createPortal } from 'react-dom'
import { Modal } from '@renderer/templates/modal/modal'

type periciaProps = {
  pericia: IPericia
  exibeTreinamento: boolean
  height: string
  width: string
  editavel: boolean
}

export const Pericia = ({
  pericia,
  exibeTreinamento,
  height,
  width,
  editavel
}: periciaProps): JSX.Element => {
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  return (
    <>
      <div className={styles.pericia} style={{ width: width, height: height }}>
        <BotaoModular
          css="simples"
          cor="transparente"
          font="tormenta20Font"
          texto={pericia.nome}
          onClickEvent={() => dispatch(abrirModal(`PERICIA_${pericia.nome}_EDICAO_MODAL`))}
        />
        <div className={styles.rolagem}>
          {exibeTreinamento && (
            <p className={styles.treinamento + ' tormenta20Font'}>{pericia.treinamento}</p>
          )}
          <BotaoModular
            css="rollBtn"
            icone="./icons/d20 cinza.svg"
            onClickEvent={() => console.log('teste')}
            texto={pericia.valorAtual}
            font="tormenta20Font"
            cor="transparente"
          />
        </div>
      </div>
      {modalAberto === `PERICIA_${pericia.nome}_EDICAO_MODAL` &&
        editavel &&
        createPortal(
          <Modal
            titulo={pericia.nome}
            onClose={() => dispatch(fecharModal())}
            height="400px"
            width="450px"
          >
            <></>
          </Modal>,
          document.body
        )}
    </>
  )
}
