import { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './switch-modular.module.scss'

type SwitchModularProps = {
  name: string
}

export const SwitchModular = ({ name }: SwitchModularProps): JSX.Element => {
  const { register } = useFormContext()

  return (
    <div>
      <input className={styles.input} id={name} type="checkbox" {...register(name)} />
      <label htmlFor={name} className={styles.toggleSwitch}></label>
    </div>
  )
}
