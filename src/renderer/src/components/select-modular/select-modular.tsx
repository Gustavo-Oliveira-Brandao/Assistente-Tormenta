import { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './select-modular.module.scss'

type SelectModularProps = {
  name: string
  options: string[]
}

export const SelectModular = ({ name, options }: SelectModularProps): JSX.Element => {
  const { register } = useFormContext()

  return (
    <select className={styles.select} id={name} {...register(name)}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}
