import { JSX, ReactNode } from 'react'
import styles from './modal.module.scss'
import { Button, Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components'

type ModalProps = {
  sidebar?: ReactNode
  footer?: ReactNode
  height: string
  width: string
  overflow?: string
  children: ReactNode
  titulo: string
}

export const ModalModular = (props: ModalProps): JSX.Element => {
  return (
    <ModalOverlay className={styles.overlay} isDismissable={true}>
      <Modal className={styles.modal}>
        <Dialog className={styles.dialog}>
          <div className={styles.modalHeader}>
            <Heading className={`tormenta20Font`}>{props.titulo}</Heading>
            <Button slot="close" className={styles.botaoClose}>
              <img src="./icons/close.svg" alt="Fechar" />
            </Button>
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
          <div className={styles.footer}>{props.footer}</div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
