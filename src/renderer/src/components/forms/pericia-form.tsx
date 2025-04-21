import { zodResolver } from '@hookform/resolvers/zod'
import { IPericia } from '@renderer/@types/t20/Pericia'
import { opcoesAtributos } from '@renderer/utils/select options/opcoesAtributos'
import { opcoesTreinamento } from '@renderer/utils/select options/opcoesTreinamento'
import { useAtualizarPericiaMutation } from '@renderer/hooks/mutations/pericia/useAtualizarPericiaMutation'
import { fecharModal } from '@renderer/store/slices/modalSlice'
import { periciaSchema } from '@renderer/validators/schemas/periciaSchema'
import { useForm, useFieldArray, SubmitHandler, FormProvider } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import BotaoModular from '../botao-modular/botao-modular'
import FormGroup from '../form-group/form-group'

export const PericiaForm = ({ pericia }: { pericia: IPericia }): JSX.Element => {
  const atualizarPericia = useAtualizarPericiaMutation()
  const dispatch = useDispatch()
  const methods = useForm<z.infer<typeof periciaSchema>>({
    resolver: zodResolver(periciaSchema),
    defaultValues: {
      treinamento: pericia.treinamento,
      atributo: pericia.atributo,
      bonus: pericia.bonus
    }
  })

  const { control, handleSubmit } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bonus'
  })

  const onEditPericia: SubmitHandler<z.infer<typeof periciaSchema>> = async (
    data
  ): Promise<void> => {
    const novaPericia = { ...pericia }
    novaPericia.treinamento = data.treinamento
    novaPericia.atributo = data.atributo
    novaPericia.bonus = data.bonus
    atualizarPericia.mutate(novaPericia)
    dispatch(fecharModal())
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onEditPericia)}>
        <fieldset>
          <legend>Pericia</legend>
          <div className="d-flex">
            <FormGroup
              name="atributo"
              label="Atributo:"
              type="dropdown"
              options={opcoesAtributos}
            />
            <FormGroup
              name="treinamento"
              label="Treinamento:"
              type="dropdown"
              options={opcoesTreinamento}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Modificadores</legend>
          {fields.map((field, index) => (
            <div key={field.id} className="d-flex">
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
        <input type="submit" value="Salvar" />
      </form>
    </FormProvider>
  )
}
