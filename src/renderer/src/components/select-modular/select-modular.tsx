import { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './select-modular.module.scss'

type FormSelectModularProps = {
  name: string
  options: string[]
  label?: string
}

export const FormSelectModular = ({
  name,
  options,
  label
}: FormSelectModularProps): JSX.Element => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className={styles.formGroup}>
      {label && (
        <label className={'label tormenta20Font'} htmlFor={name}>
          {label}
        </label>
      )}
      <select className={'select tormenta20Font'} id={name} {...register(name)}>
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
