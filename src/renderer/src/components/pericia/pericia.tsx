import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { JSX } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './pericia.module.scss'
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { BotaoModular } from '../botao-modular/botao-modular'
import { RootState } from '@renderer/store/store'
import { createPortal } from 'react-dom'
import { Modal } from '@renderer/templates/modal/modal'
import { SimpleCard } from '../simple-card/simple-card'

type periciaProps = {
  pericia: IPericia
  exibeTreinamento: boolean
  editavel: boolean
}

export const Pericia = ({ pericia, exibeTreinamento, editavel }: periciaProps): JSX.Element => {
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  return (
    <>
      <SimpleCard width="100%" height="40px" css="littleCard">
        <BotaoModular
          css="botaoTimido"
          cor="transparente"
          font="tormenta20Font"
          texto={pericia.nome}
          onClickEvent={() => dispatch(abrirModal(`PERICIA_${pericia.nome}_MODAL`))}
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
      </SimpleCard>
      {modalAberto === `PERICIA_${pericia.nome}_MODAL` &&
        editavel &&
        createPortal(
          <Modal titulo={pericia.nome} height="400px" width="450px">
            <></>
          </Modal>,
          document.body
        )}
    </>
  )
}
