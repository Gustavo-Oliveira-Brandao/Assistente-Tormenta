import { zodResolver } from '@hookform/resolvers/zod'
import { IAtributo } from '@renderer/@types/t20/Atributo'
import { useAtualizarAtributoMutation } from '@renderer/hooks/mutations/atributo/useAtualizarAtributoMutation'
import { fecharModal } from '@renderer/store/slices/modalSlice'
import { atributoSchema } from '@renderer/validators/schemas/atributoSchema'
import { useForm, useFieldArray, SubmitHandler, FormProvider } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import BotaoModular from '../botao-modular/botao-modular'
import FormGroup from '../form-group/form-group'
import styles from '@renderer/assets/styles/forms.module.scss'

export const AtributoForm = ({ atributo }: { atributo: IAtributo }): JSX.Element => {
  const dispatch = useDispatch()

  const atualizarAtributo = useAtualizarAtributoMutation()

  const methods = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: atributoSchema.parse(atributo)
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

  const onEdit: SubmitHandler<z.infer<typeof atributoSchema>> = async (data): Promise<void> => {
    const novoAtributo = { ...atributo, ...data }
    novoAtributo.bonus = data.bonus
    atualizarAtributo.mutate(novoAtributo)
    dispatch(fecharModal())
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onEdit)}>
        <fieldset className={styles.fieldset}>
          <legend>Atributo</legend>
          <div className={styles.rowFields}>
            <FormGroup
              name="valor"
              label="valor:"
              placeholder={String(atributo.valor)}
              type="number"
            />
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>Modificadores</legend>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.rowFields}>
              <FormGroup
                name={`bonus.${index}.label`}
                label="nome:"
                placeholder="Forma selvagem"
                type="text"
              />
              <FormGroup
                name={`bonus.${index}.valor`}
                label="valor:"
                placeholder="0"
                type="number"
              />
              <FormGroup name={`bonus.${index}.estaAtivo`} label="Ativo:" type="checkbox" />
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
          <p className="alert" role="alert" key={field}>
            {error.message}!
          </p>
        ))}
        <input className={styles.submitButton} type="submit" value="Salvar" />
      </form>
    </FormProvider>
  )
}
