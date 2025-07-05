import { JSX, ReactNode } from 'react'
import styles from './fieldset.module.scss'

type FieldsetModularProps = {
  children: ReactNode
  legend: string
}

export const FieldsetModular = ({ children, legend }: FieldsetModularProps): JSX.Element => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={`${styles.legend} geist`}>{legend}</legend>
      <div className={styles.row}>{children}</div>
    </fieldset>
  )
}
