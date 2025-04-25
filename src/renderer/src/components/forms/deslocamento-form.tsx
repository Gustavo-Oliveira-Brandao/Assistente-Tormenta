import { IRecurso } from '@renderer/@types/t20/Recurso'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import BotaoModular from '../botao-modular/botao-modular'
import FormGroup from '../form-group/form-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarRecursoMutation } from '@renderer/hooks/mutations/recurso/useAtualizarRecursoMutation'
import { fecharModal } from '@renderer/store/slices/modalSlice'
import { recursoSchema } from '@renderer/validators/schemas/recursoSchema'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import styles from '@renderer/assets/styles/forms.module.scss'

export const DeslocamentoForm = ({ deslocamento }: { deslocamento: IRecurso }): JSX.Element => {
  const atualizarRecurso = useAtualizarRecursoMutation()
  const dispatch = useDispatch()

  const onEdit: SubmitHandler<z.infer<typeof recursoSchema>> = async (data): Promise<void> => {
    const recursoAtualizado = {
      ...deslocamento,
      ...data
    }

    atualizarRecurso.mutate(recursoAtualizado)
    dispatch(fecharModal())
  }

  const methods = useForm<z.infer<typeof recursoSchema>>({
    resolver: zodResolver(recursoSchema),
    defaultValues: recursoSchema.parse(deslocamento)
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bonus'
  })

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onEdit)}>
        <fieldset className={styles.fieldset}>
          <legend>Deslocamento atual</legend>
          <div className={styles.rowFields}>
            <FormGroup
              name="valorAtual"
              label={`atual:`}
              placeholder={String(deslocamento.valorAtual)}
              type="number"
            />
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>Modificadores de deslocamento</legend>
          {fields.map((field, index) => (
            <div className={styles.rowFields} key={field.id}>
              <FormGroup
                name={`bonus.${index}.label`}
                label="nome:"
                placeholder="Robusto"
                type="text"
              />
              <FormGroup
                name={`bonus.${index}.valor`}
                label="valor:"
                placeholder="0"
                type="number"
              />
              <FormGroup name={`bonus.${index}.estaAtivo`} label="ativo:" type="checkbox" />
              <FormGroup name={`bonus.${index}.ehPorNivel`} label="P/ nivel?" type="checkbox" />
              <BotaoModular
                css="botaoInteracao"
                icone="./icons/delete.svg"
                onClickEvent={() => remove(index)}
              />
            </div>
          ))}
          <BotaoModular
            css="botaoAdicionar"
            onClickEvent={() =>
              append({
                label: 'Buff',
                valor: 0,
                estaAtivo: false,
                ehPorNivel: false
              })
            }
            texto="Adicionar modificador"
            icone="./icons/plus-solid.svg"
          />
        </fieldset>
        {Object.entries(errors).map(([field, error]) => (
          <p className={styles.alert} role="alert" key={field}>
            {error.message}!
          </p>
        ))}
        <input className={styles.submitButton} type="submit" value="salvar" />
      </form>
    </FormProvider>
  )
}
