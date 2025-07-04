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
import { IOption } from '@renderer/@types/option'

type SelectFieldModularProps = {
  label: string
  options: IOption[]
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
          id={name}
          name={name}
          ref={ref}
          selectedKey={value}
          onSelectionChange={onChange}
          onBlur={onBlur}
          className={styles.formController}
        >
          <Label className={`${styles.label} tormenta20Font`}>{label}</Label>
          <Button className={styles.select}>
            <SelectValue className={`${styles.selectValue} tormenta20Font`} />
            <span aria-hidden="true">▼</span>
          </Button>
          <Popover className={styles.popover}>
            <ListBox className={styles.listBox}>
              {options.map((opt) => (
                <ListBoxItem
                  key={opt.value}
                  id={opt.value}
                  className={`${styles.item} tormenta20Font`}
                >
                  {opt.text}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      )}
    />
  )
}
