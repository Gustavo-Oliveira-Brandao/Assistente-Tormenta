import { ReactNode } from 'react'
import styles from './modal.module.scss'

const Modal = ({
  titulo,
  onClose,
  children,
  height,
  footer,
  width,
  overflow = 'auto'
}: {
  titulo: string
  onClose: () => void
  children: ReactNode
  height: string
  width: string
  footer?: ReactNode
  overflow?: string
}): JSX.Element => {
  return (
    <div className={styles.cover}>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2>{titulo}</h2>
          <button onClick={onClose}>
            <img src="./icons/close.svg" alt="Fechar modal" />
          </button>
        </header>
        <div className={styles.modalConteudo} style={{ height: height, width, overflow: overflow }}>
          {children}
        </div>
        {footer && <footer className={styles.modalFooter}>{footer}</footer>}
      </div>
    </div>
  )
}

export default Modal
