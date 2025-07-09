import { JSX } from 'react'
import { Label, Switch } from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'
import styles from './switch-field.module.scss'

type SwitchFieldModularProps = {
  label: string
  name: string
}

export const SwitchFieldModular = ({ name, label }: SwitchFieldModularProps): JSX.Element => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange, onBlur, ref } }) => (
        <div className={styles.formController}>
          <Label className={`${styles.label} inter`}>{label}</Label>
          <Switch
            ref={ref}
            value={value}
            isSelected={value}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            className={styles.switch}
          >
            <div className={styles.indicador} />
          </Switch>
        </div>
      )}
    />
  )
}

type StandaloneSwitchProps = {
  label?: string
  name: string
  estadoInicial: boolean
  onChange: (valor: boolean) => void
}

export const StandaloneSwitch = ({
  name,
  label,
  estadoInicial,
  onChange
}: StandaloneSwitchProps): JSX.Element => {
  return (
    <div className={styles.formController}>
      {label && <Label className={`${styles.label} inter`}>{label}</Label>}
      <Switch
        isSelected={estadoInicial}
        name={name}
        onChange={(e) => onChange(e)}
        className={styles.switch}
      >
        <div className={styles.indicador} />
      </Switch>
    </div>
  )
}
