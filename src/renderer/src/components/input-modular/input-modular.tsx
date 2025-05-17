import { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './input-modular.module.scss'

type InputModularProps = {
  placeholder?: string
  type: string
  name: string
}

export const InputModular = ({ placeholder, type, name }: InputModularProps): JSX.Element => {
  const { register } = useFormContext()

  return (
    <input
      className={styles.input}
      id={name}
      type={type}
      {...register(name)}
      placeholder={placeholder}
    />
  )
}
