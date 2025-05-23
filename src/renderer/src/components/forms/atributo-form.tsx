import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { useAtualizarAtributo } from '@renderer/hooks/mutations/useAtributoMutation'
import { atributoSchema } from '@renderer/validators/schemas/atributo'
import { JSX } from 'react'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { fecharModal } from '@renderer/store/slices/modalSlice'
import styles from '@renderer/assets/styles/forms.module.scss'
import { InputModular } from '../input-modular/input-modular'
import { SwitchModular } from '../switch-modular/switch-modular'
import { BotaoModular } from '../botao-modular/botao-modular'

type atributoFormProps = {
  atributo: IAtributo
}

export const AtributoForm = ({ atributo }: atributoFormProps): JSX.Element => {
  const dispatch = useDispatch()

  const atualizarAtributo = useAtualizarAtributo()

  const methods = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: {
      valorBase: atributo.valorBase,
      bonus: atributo.bonus
    }
  })

  const { control, handleSubmit } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bonus'
  })

  const onEdit: SubmitHandler<z.infer<typeof atributoSchema>> = async (data): Promise<void> => {
    const novoAtributo = { ...atributo, ...data }
    novoAtributo.bonus = data.bonus
    console.log(novoAtributo)
    atualizarAtributo.mutate(novoAtributo)
    dispatch(fecharModal())
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onEdit)}>
        <fieldset className={styles.fieldset}>
          <legend className={'tormenta20Font'}>Atributo</legend>
          <div className={styles.rowFields}>
            <InputModular name="valorBase" label="Valor:" placeholder="0" type="number" />
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
