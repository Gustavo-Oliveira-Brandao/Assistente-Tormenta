import { zodResolver } from '@hookform/resolvers/zod'
import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { useAtualizarPericia } from '@renderer/hooks/mutations/usePericiaMutation'
import { fecharModal } from '@renderer/store/slices/modalSlice'
import { periciaSchema } from '@renderer/validators/schemas/pericia'
import { JSX } from 'react'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import styles from '@renderer/assets/styles/forms.module.scss'
import { SelectModular } from '../select-modular/select-modular'
import { opcoesAtributos } from '@renderer/utils/select options/opcoesAtributos'
import { opcoesTreinamento } from '@renderer/utils/select options/opcoesTreinamento'
import { BotaoModular } from '../botao-modular/botao-modular'
import { InputModular } from '../input-modular/input-modular'
import { SwitchModular } from '../switch-modular/switch-modular'

type periciaFormProps = {
  pericia: IPericia
}

export const PericiaForm = ({ pericia }: periciaFormProps): JSX.Element => {
  const atualizarPericia = useAtualizarPericia()
  const dispatch = useDispatch()
  const methods = useForm<z.infer<typeof periciaSchema>>({
    resolver: zodResolver(periciaSchema),
    defaultValues: periciaSchema.parse(pericia)
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
      <form className={styles.form} onSubmit={handleSubmit(onEditPericia)}>
        <fieldset className={styles.fieldset}>
          <legend className="tormenta20Font">Pericia</legend>
          <div className={styles.rowFields}>
            <SelectModular name="atributo" label="Atributo:" options={opcoesAtributos} />
            <SelectModular name="treinamento" label="Treinamento:" options={opcoesTreinamento} />
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={'tormenta20Font'}>Modificadores</legend>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.rowFields}>
              <InputModular
                name={`bonus.${index}.label`}
                label="nome:"
                placeholder="Forma selvagem"
                type="text"
              />
              <InputModular
                name={`bonus.${index}.valor`}
                label="valor:"
                placeholder="0"
                type="number"
              />
              <SwitchModular name={`bonus.${index}.estaAtivo`} label="Ativo:" />
              <BotaoModular
                css="botaoQuadrado30px"
                cor="corSecundaria"
                icone="./icons/delete.svg"
                onClickEvent={() => remove(index)}
              />
            </div>
          ))}
          <BotaoModular
            css="minimalista"
            onClickEvent={() =>
              append({
                label: 'Bônus',
                valor: 0,
                estaAtivo: false,
                ehPorNivel: false
              })
            }
            cor="transparente"
            font="tormenta20Font"
            texto="Adicionar modificador"
            icone="./icons/adicao.svg"
          />
        </fieldset>
        <input className={styles.submitButton + ' tormenta20Font'} type="submit" value="Salvar" />
      </form>
    </FormProvider>
  )
}
