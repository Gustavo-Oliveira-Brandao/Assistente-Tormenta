import { IModificador } from '@renderer/@types/T20 GOTY/IModificador'
import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX } from 'react'
import { SimpleCard } from '../simple-card/simple-card'

type CardModificadorProps = {
  modificador: IModificador
}

export const CardModificador = ({ modificador }: CardModificadorProps): JSX.Element => {
  return <SimpleCard width="100%" height="55px"></SimpleCard>
}
