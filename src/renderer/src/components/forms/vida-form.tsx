import { IRecurso } from '@renderer/@types/t20/Recurso'
import { opcoesAtributos } from '@renderer/utils/select options/opcoesAtributos'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import BotaoModular from '../botao-modular/botao-modular'
import FormGroup from '../form-group/form-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarRecursoMutation } from '@renderer/hooks/mutations/recurso/useAtualizarRecursoMutation'
import { fecharModal } from '@renderer/store/slices/modalSlice'
import { recursoSchema } from '@renderer/validators/schemas/recursoSchema'
import { z } from 'zod'
import { useDispatch } from 'react-redux'

export const VidaForm = ({ vida }: { vida: IRecurso }): JSX.Element => {
  const atualizarRecurso = useAtualizarRecursoMutation()
  const dispatch = useDispatch()

  const onEdit: SubmitHandler<z.infer<typeof recursoSchema>> = async (data): Promise<void> => {
    const recursoAtualizado = {
      ...vida,
      ...data
    }

    atualizarRecurso.mutate(recursoAtualizado)
    dispatch(fecharModal())
  }

  const methods = useForm<z.infer<typeof recursoSchema>>({
    resolver: zodResolver(recursoSchema),
    defaultValues: recursoSchema.parse(vida)
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
      <form onSubmit={handleSubmit(onEdit)}>
        <fieldset>
          <legend>Vida atual</legend>
          <div className="d-flex">
            <FormGroup
              name="valorAtual"
              label={`atual:`}
              placeholder={String(vida.valorAtual)}
              type="number"
            />
            <FormGroup
              name="valorTemporario"
              label={`temp:`}
              placeholder={String(vida.valorTemporario)}
              type="number"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Vida maxima</legend>
          <div className="d-flex">
            <FormGroup
              name="atributo"
              label="atributo:"
              type="dropdown"
              options={opcoesAtributos}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Modificadores de vida maxima</legend>
          {fields.map((field, index) => (
            <div className="d-flex" key={field.id}>
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
          <p role="alert" key={field}>
            {error.message}!
          </p>
        ))}
        <input type="submit" value="salvar" />
      </form>
    </FormProvider>
  )
}
