import styles from './form-group.module.scss'
import { useFormContext } from 'react-hook-form'

const FormGroup = ({
  name,
  options,
  label,
  placeholder,
  type
}: {
  name: string
  options?: string[]
  label: string
  placeholder?: string
  type: string
}): JSX.Element => {
  const { register } = useFormContext()
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      {type === 'number' && (
        <input id={name} type={type} {...register(name)} placeholder={placeholder} />
      )}
      {type === 'text' && (
        <input id={name} type={type} {...register(name)} placeholder={placeholder} />
      )}
      {type === 'checkbox' && (
        <div>
          <input id={name} type={type} {...register(name)} />
          <label htmlFor={name} className={styles.toggleSwitch}></label>
        </div>
      )}
      {type === 'dropdown' && (
        <select id={name} {...register(name)}>
          {options &&
            options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
        </select>
      )}
    </div>
  )
}

export default FormGroup
