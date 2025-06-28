import { JSX, ReactNode } from 'react'
import styles from './modal.module.scss'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { useDispatch } from 'react-redux'
import { fecharModal } from '@renderer/store/slices/modalSlice'

type ModalProps = {
  sidebar?: ReactNode
  footer?: ReactNode
  height: string
  width: string
  overflow?: string
  children: ReactNode
  titulo: string
}

export const Modal = (props: ModalProps): JSX.Element => {
  const dispatch = useDispatch()

  return (
    <div className={styles.cover}>
      <div className={styles.backdrop} onClick={() => dispatch(fecharModal())}></div>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2 className="tormenta20Font">{props.titulo}</h2>
          <BotaoModular
            css="botaoClosePopUp"
            onClickEvent={() => dispatch(fecharModal())}
            icone="./icons/close.svg"
            cor="transparente"
          />
        </header>
        <div className={styles.main}>
          {props.sidebar && <aside className={styles.sidebar}>{props.sidebar}</aside>}
          <div
            className={styles.modalConteudo}
            style={{ height: props.height, width: props.width, overflow: props.overflow }}
          >
            {props.children}
          </div>
        </div>
        {props.footer && <footer className={styles.modalFooter}>{props.footer}</footer>}
      </div>
    </div>
  )
}
