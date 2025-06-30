import { JSX } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import styles from './text-field.module.scss'
import { FieldError, Input, Label, TextField } from 'react-aria-components'

type TextFieldProps = {
  placeholder?: string
  name: string
  label: string
}

export const TextFieldModular = ({ placeholder, name, label }: TextFieldProps): JSX.Element => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name, value, onBlur, ref, onChange },
        fieldState: { invalid, error }
      }) => (
        <TextField
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          className={styles.formController}
          validationBehavior="aria"
          isInvalid={invalid}
        >
          <Label className={`${styles.label} tormenta20Font`}>{label}</Label>
          <Input placeholder={placeholder} ref={ref} className={`${styles.input} tormenta20Font`} />
          <FieldError>{error?.message}</FieldError>
        </TextField>
      )}
    />
  )
}
