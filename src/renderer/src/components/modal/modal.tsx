import { JSX, ReactNode } from 'react'
import styles from './modal.module.scss'
import { Dialog } from '@base-ui-components/react'

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
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className={styles.backdrop} />
      <Dialog.Popup className={styles.modal}>
        <div className={styles.modalHeader}>
          <Dialog.Title className={`tormenta20Font`}>{props.titulo}</Dialog.Title>
          <Dialog.Close className={styles.botaoClose}>
            <img src="./icons/close.svg" alt="Fechar" />
          </Dialog.Close>
        </div>
        <div className={styles.main}>
          {props.sidebar && <aside className={styles.sidebar}>{props.sidebar}</aside>}
          <div
            className={styles.modalConteudo}
            style={{ height: props.height, width: props.width, overflow: props.overflow }}
          >
            {props.children}
          </div>
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  )
}
