import { JSX } from 'react'
import styles from './roll-btn.module.scss'
import { Button } from 'react-aria-components'

type RollBtnProps = {
  valor: number
}

export const RollBtn = ({ valor }: RollBtnProps): JSX.Element => {
  return (
    <Button className={styles.rollBtn}>
      <img src="./icons/d20 cinza.svg" alt="Rolagem" />
      <p className="inter">{valor}</p>
    </Button>
  )
}
