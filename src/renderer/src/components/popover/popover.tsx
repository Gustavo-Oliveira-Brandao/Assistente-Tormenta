import { JSX, ReactNode } from 'react'
import styles from './popover.module.scss'
import { Dialog, Heading, OverlayArrow, Popover } from 'react-aria-components'
import { Placement } from 'react-aria'

type PopoverModularProps = {
  children: ReactNode
  titulo?: string
  placement: Placement
  width: string
}
export const PopoverModular = (props: PopoverModularProps): JSX.Element => {
  return (
    <Popover className={styles.popover} placement={props.placement}>
      <OverlayArrow className={styles.arrow}>
        <svg width={20} height={20} viewBox="0 0 12 12">
          <path d="M0 0 L6 6 L12 0" />
        </svg>
      </OverlayArrow>
      <Dialog className={styles.popup}>
        {props.titulo && (
          <Heading className={`${styles.title} tormenta20Font`}>{props.titulo}</Heading>
        )}
        <div className={styles.panel} style={{ width: props.width }}>
          {props.children}
        </div>
      </Dialog>
    </Popover>
  )
}
