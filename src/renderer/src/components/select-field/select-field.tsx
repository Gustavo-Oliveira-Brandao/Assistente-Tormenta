import { JSX } from 'react'
import styles from './select-field.module.scss'
import { Controller, useFormContext } from 'react-hook-form'
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue
} from 'react-aria-components'

type SelectFieldModularProps = {
  label: string
  options: string[]
  name: string
}

export const SelectFieldModular = ({
  label,
  options,
  name
}: SelectFieldModularProps): JSX.Element => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange, onBlur, ref } }) => (
        <Select
          name={name}
          ref={ref}
          selectedKey={value}
          onSelectionChange={onChange}
          onBlur={onBlur}
          className={styles.formController}
        >
          <Label className={`${styles.label} tormenta20Font`}>{label}</Label>
          <Button>
            <SelectValue />
          </Button>
          <Popover>
            <ListBox>
              {options.map((opt) => (
                <ListBoxItem key={opt}>{opt}</ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      )}
    />
  )
}
