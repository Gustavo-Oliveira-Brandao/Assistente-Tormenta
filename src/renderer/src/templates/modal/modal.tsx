import { ReactNode } from 'react'
import styles from './modal.module.scss'

const Modal = ({
  titulo,
  onClose,
  children
}: {
  titulo: string
  onClose: () => void
  children: ReactNode
}): JSX.Element => {
  return (
    <div className={styles.cover}>
      <div className={styles.borrao} onClick={onClose}></div>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2>{titulo}</h2>
          <button onClick={onClose}>
            <img src="/icons/close.svg" alt="Fechar modal" />
          </button>
        </header>
        <div className={styles.modalConteudo}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
