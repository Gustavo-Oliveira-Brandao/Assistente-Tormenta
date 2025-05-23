import { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './select-modular.module.scss'

type SelectModularProps = {
  name: string
  options: string[]
  label: string
}

export const SelectModular = ({ name, options, label }: SelectModularProps): JSX.Element => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className={styles.formGroup}>
      <label className={styles.label + ' tormenta20Font'} htmlFor={name}>
        {label}
      </label>
      <select className={styles.select + ' tormenta20Font'} id={name} {...register(name)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {errors[name] && (
        <p className="alert" role="alert">
          {String(errors[name].message)}
        </p>
      )}
    </div>
  )
}
