import styles from '@renderer/assets/styles/forms.module.scss'
import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { JSX } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { atributoSchema } from '@renderer/validators/schemas/atributo'
import { FormInputModular } from '@renderer/components/input-modular/input-modular'
import { Modal } from '@renderer/templates/modal/modal'
import { useAtualizarAtributo } from '@renderer/hooks/mutations/useAtributoMutation'
import { useDispatch } from 'react-redux'
import { fecharModal } from '@renderer/store/slices/modalSlice'

type AtributoFormsProps = {
  atributo: IAtributo
}

export const AtributosForm = ({ atributo }: AtributoFormsProps): JSX.Element => {
  const methods = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: {
      valorBase: atributo.valorBase,
      bonus: atributo.bonus
    }
  })

  const dispatch = useDispatch()

  const atualizarAtributo = useAtualizarAtributo()

  const onSubmit = (data): void => {
    const novoAtributo: IAtributo = {
      ...atributo,
      valorBase: data.valorBase,
      bonus: data.bonus
    }
    atualizarAtributo.mutate(novoAtributo)
    dispatch(fecharModal())
  }

  return (
    <Modal titulo={atributo.nome} height="fit-content" width="550px" overflow="auto">
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset}>
            <legend className="tormenta20Font">Atributo</legend>
            <div className={styles.rowFields}>
              <FormInputModular type="number" name="valorBase" label="Valor base:" />
              <FormInputModular type="number" name="bonus" label="Bônus:" />
            </div>
          </fieldset>
          <input className={`${styles.submitButton} tormenta20Font`} type="submit" value="Salvar" />
        </form>
      </FormProvider>
    </Modal>
  )
}
