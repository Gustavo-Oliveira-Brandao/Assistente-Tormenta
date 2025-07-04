import { JSX, ReactElement } from 'react'
import styles from './number-field.module.scss'
import { Controller, useFormContext } from 'react-hook-form'
import { Button, Group, Input, Label, NumberField } from 'react-aria-components'

type NumberFieldProps = {
  name: string
  css: string
  label: string
  placeholder: string
}

export const NumberFieldModular = ({
  name,
  label,
  css,
  placeholder
}: NumberFieldProps): ReactElement => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange, onBlur, ref } }) => (
        <NumberField
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          className={`${styles.formController} ${styles[css]}`}
        >
          <Label className={`${styles.label} tormenta20Font`}>{label}</Label>

          <Group className={styles.grupo}>
            <Button slot="decrement" className={styles.diminuir}>
              <MinusIcon />
            </Button>
            <Input
              ref={ref}
              placeholder={placeholder}
              className={`${styles.input} tormenta20Font`}
            />
            <Button slot="increment" className={styles.aumentar}>
              <PlusIcon />
            </Button>
          </Group>
        </NumberField>
      )}
    />
  )
}

const PlusIcon = (props: React.ComponentProps<'svg'>): JSX.Element => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  )
}

const MinusIcon = (props: React.ComponentProps<'svg'>): JSX.Element => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  )
}
