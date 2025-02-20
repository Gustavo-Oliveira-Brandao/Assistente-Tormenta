import { IFormData } from '@renderer/@types/FormData'
import styles from './input-modular.module.scss'
import { useFormContext } from 'react-hook-form'

const FormGroup = ({ question }: { question: IFormData }): JSX.Element => {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  return (
    <div className={styles.formGroup}>
      <label htmlFor={question.elementId}>{question.label}</label>
      {question.type === 'number' && (
        <input
          id={question.elementId}
          type={question.type}
          {...register(question.name, {
            min: {
              value: question.min ?? 0,
              message: `O valor minimo é ${question.min ?? 0}`
            },
            max: {
              value: question.max ?? 10000,
              message: `O valor maximo é ${question.max ?? 10000}`
            },
            required: question.required
          })}
          placeholder={question.placeholder}
        />
      )}
      {question.type === 'text' && (
        <input
          id={question.elementId}
          type={question.type}
          {...register(question.name, {
            minLength: {
              value: question.minLength ?? 0,
              message: `O minimo de caracteres é ${question.minLength}.`
            },
            maxLength: {
              value: question.maxLength ?? 255,
              message: `O maximo de caracteres é ${question.maxLength}.`
            },
            required: question.required
          })}
          placeholder={question.placeholder}
        />
      )}
      {question.type === 'dropdown' && (
        <select
          id={question.elementId}
          {...register(question.name, { required: question.required })}
        >
          {question.options &&
            question.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.text}
              </option>
            ))}
        </select>
      )}
      {errors[question.name] && <p role="alert">{String(errors[question.name]?.message)}</p>}
    </div>
  )
}

export default FormGroup
