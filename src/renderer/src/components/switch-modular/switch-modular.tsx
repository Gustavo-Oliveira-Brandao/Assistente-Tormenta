import { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './switch-modular.module.scss'

type SwitchModularProps = {
  name: string
  label: string
}

export const SwitchModular = ({ name, label }: SwitchModularProps): JSX.Element => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className={styles.formGroup}>
      <label className={styles.label + ' tormenta20Font'} htmlFor={name}>
        {label}
      </label>
      <div>
        <input className={styles.input} id={name} type="checkbox" {...register(name)} />
        <label htmlFor={name} className={styles.toggleSwitch}></label>
      </div>

      {errors[name] && (
        <p className="alert" role="alert">
          {String(errors[name].message)}
        </p>
      )}
    </div>
  )
}
