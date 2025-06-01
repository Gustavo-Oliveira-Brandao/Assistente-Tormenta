import { JSX, ReactNode } from 'react'
import styles from './simple-card.module.scss'

type SimpleCardProps = {
  width: string
  height: string
  children: ReactNode
}
export const SimpleCard = ({ width, height, children }: SimpleCardProps): JSX.Element => {
  return (
    <div className={styles.card} style={{ width: width, height: height }}>
      {children}
    </div>
  )
}
