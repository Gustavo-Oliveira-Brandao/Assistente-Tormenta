import { JSX, ReactNode } from 'react'
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
  name: string
  children: ReactNode
}

export const SelectFieldModular = ({
  label,
  children,
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
          <Label className={`${styles.label} geist`}>{label}</Label>
          <Button className={styles.select}>
            <SelectValue className={`${styles.selectValue} geist`} />
            <span aria-hidden="true">▼</span>
          </Button>
          <Popover className={styles.popover}>
            <ListBox className={styles.listBox}>{children}</ListBox>
          </Popover>
        </Select>
      )}
    />
  )
}

type OptionModularProps = {
  name: string
  value: string
}

export const OptionModular = ({ name, value }: OptionModularProps): JSX.Element => {
  return (
    <ListBoxItem id={name} className={`${styles.option} geist`}>
      {value}
    </ListBoxItem>
  )
}

type StandaloneSelectProps = {
  label: string
  children: ReactNode
  name: string
  selecao: string
  onChange: (e: string) => void
}

export const StandaloneSelect = ({
  label,
  children,
  name,
  selecao,
  onChange
}: StandaloneSelectProps): JSX.Element => {
  return (
    <Select
      id={name}
      name={name}
      selectedKey={selecao}
      onSelectionChange={(key) => {
        if (key) {
          onChange(key.toString())
        }
      }}
      className={styles.formController}
    >
      <Label className={`${styles.label} geist`}>{label}</Label>
      <Button className={styles.select}>
        <SelectValue className={`${styles.selectValue} geist`} />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover className={styles.popover}>
        <ListBox className={styles.listBox}>{children}</ListBox>
      </Popover>
    </Select>
  )
}
