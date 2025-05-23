import { JSX, ReactNode } from 'react'
import styles from './modal.module.scss'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'

type ModalProps = {
  titulo: string
  onClose: () => void
  children: ReactNode
  height: string
  width: string
  footer?: ReactNode
  overflow?: string
}

export const Modal = (props: ModalProps): JSX.Element => {
  return (
    <div className={styles.cover}>
      <div className={styles.backdrop} onClick={props.onClose}></div>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2 className="tormenta20Font">{props.titulo}</h2>
          <BotaoModular
            css="botaoClose"
            onClickEvent={() => props.onClose}
            icone="./icons/close.svg"
            cor="transparente"
          />
        </header>
        <div
          className={styles.modalConteudo}
          style={{ height: props.height, width: props.width, overflow: props.overflow }}
        >
          {props.children}
        </div>
        {props.footer && <footer className={styles.modalFooter}>{props.footer}</footer>}
      </div>
    </div>
  )
}
