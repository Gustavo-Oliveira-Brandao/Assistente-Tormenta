import { IFormData } from '@renderer/@types/FormData'
import styles from './input-modular.module.scss'
import { useFormContext } from 'react-hook-form'

const FormGroup = ({ question }: { question: IFormData }): JSX.Element => {
  const { register } = useFormContext()
  return (
    <div className={styles.formGroup}>
      <label>{question.label}</label>
      {question.type === 'number' && (
        <input
          type={question.type}
          {...register(question.name, {
            min: {
              value: question.min ?? 0,
              message: `O valor de ${question.label} deve ser entre ${question.min ?? 0} e ${question.max ?? 9999}`
            },
            max: {
              value: question.max ?? 9999,
              message: `O valor de ${question.label} deve ser entre ${question.min ?? 0} e ${question.max ?? 9999}`
            },
            required: question.required
          })}
          placeholder={question.placeholder}
        />
      )}
      {question.type === 'text' && (
        <input
          type={question.type}
          {...register(question.name, {
            minLength: {
              value: question.minLength ?? 0,
              message: `O minimo de caracteres é ${question.minLength}`
            },
            maxLength: {
              value: question.maxLength ?? 9999,
              message: `O maximo de caracteres é ${question.maxLength}`
            },
            required: question.required
          })}
          placeholder={question.placeholder}
        />
      )}
      {question.type === 'dropdown' && (
        <select {...register(question.name, { required: question.required })}>
          {question.options &&
            question.options.map((opt) => (
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
