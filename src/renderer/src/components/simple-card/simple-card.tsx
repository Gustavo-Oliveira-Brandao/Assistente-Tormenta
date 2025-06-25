import { JSX, ReactNode } from 'react'
import styles from './simple-card.module.scss'

type SimpleCardProps = {
  width: string
  height: string
  css: string
  children: ReactNode
}
export const SimpleCard = ({ width, css, height, children }: SimpleCardProps): JSX.Element => {
  return (
    <div className={`${styles.card} ${styles[css]}`} style={{ width: width, height: height }}>
      {children}
    </div>
  )
}
