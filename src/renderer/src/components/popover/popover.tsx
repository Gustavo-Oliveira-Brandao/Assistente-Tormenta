import { JSX, ReactNode } from 'react'
import styles from './popover.module.scss'
import { Dialog, Heading, Popover } from 'react-aria-components'
import { Placement } from 'react-aria'

type PopoverModularProps = {
  children: ReactNode
  titulo: string
  placement: Placement
  width: string
}
export const PopoverModular = (props: PopoverModularProps): JSX.Element => {
  return (
    <Popover className={styles.popover} placement={props.placement}>
      <Dialog className={styles.popup}>
        <Heading className={`${styles.title} tormenta20Font`}>{props.titulo}</Heading>
        <div className={styles.panel} style={{ width: props.width }}>
          {props.children}
        </div>
      </Dialog>
    </Popover>
  )
}
