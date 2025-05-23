import { JSX, ReactNode } from 'react'
import styles from './sidebar.module.scss'
type sidebarProps = {
  children: ReactNode
}

export const Sidebar = (props: sidebarProps): JSX.Element => {
  return <aside className={styles.sidebar}>{props.children}</aside>
}
