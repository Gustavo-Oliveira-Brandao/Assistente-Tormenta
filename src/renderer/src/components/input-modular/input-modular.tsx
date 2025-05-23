import { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './input-modular.module.scss'

type InputModularProps = {
  placeholder?: string
  type: string
  name: string
  label: string
}

export const InputModular = ({
  placeholder,
  type,
  name,
  label
}: InputModularProps): JSX.Element => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className={styles.formGroup}>
      <label className={styles.label + ' tormenta20Font'} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input + ' tormenta20Font'}
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="alert" role="alert">
          {String(errors[name].message)}
        </p>
      )}
    </div>
  )
}
