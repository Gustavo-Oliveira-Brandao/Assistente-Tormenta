import styles from './form-group.module.scss'
import { useFormContext } from 'react-hook-form'

type options = {
  value: string | number
  text: string
}[]
const FormGroup = ({
  name,
  options,
  label,
  placeholder,
  type
}: {
  name: string
  options?: options
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
      {type === 'checkbox' && <input id={name} type={type} {...register(name)} />}
      {type === 'dropdown' && (
        <select id={name} {...register(name)}>
          {options &&
            options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.text}
              </option>
            ))}
        </select>
      )}
    </div>
  )
}

export default FormGroup
