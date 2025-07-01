import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { JSX, useState } from 'react'
import styles from './atributo.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarAtributo } from '@renderer/hooks/mutations/useAtributoMutation'
import { atributoSchema } from '@renderer/validators/schemas/atributo'
import { z } from 'zod'
import formStyles from '@renderer/assets/styles/forms.module.scss'
import { PopoverModular } from '../popover/popover'
import { IModificador } from '@renderer/@types/T20 GOTY/IModificador'
import { NumberFieldModular } from '../number-field/number-field'
import { Button, DialogTrigger } from 'react-aria-components'
import { BotaoModular } from '../botao-modular/botao-modular'

type AtributoProps = {
  atributo: IAtributo
  modificadores?: IModificador[]
}
export const Atributo = ({ atributo, modificadores }: AtributoProps): JSX.Element => {
  const atualizarAtributo = useAtualizarAtributo()

  const [edicaoEstaAberta, setEdicaoEstaAberta] = useState(false)

  const methodsAtributos = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: {
      valorBase: atributo.valorBase
    }
  })

  const onSubmitAtributos = (data): void => {
    const novoAtributo: IAtributo = {
      ...atributo,
      valorBase: data.valorBase
    }
    atualizarAtributo.mutate(novoAtributo)
    setEdicaoEstaAberta(false)
  }

  return (
    <div className={styles.atributo} key={atributo.id}>
      <div className={styles.titulo}>
        <DialogTrigger isOpen={edicaoEstaAberta} onOpenChange={setEdicaoEstaAberta}>
          <BotaoModular css="botaoTimido" font="tormenta20Font" cor="transparente">
            <p>{atributo.nome}</p>
          </BotaoModular>
          <PopoverModular width="fit-content" titulo={atributo.nome}>
            <FormProvider {...methodsAtributos}>
              <form
                className={formStyles.form}
                onSubmit={methodsAtributos.handleSubmit(onSubmitAtributos)}
              >
                <fieldset className={formStyles.fieldset}>
                  <div className={formStyles.rowFields}>
                    <NumberFieldModular name="valorBase" placeholder="0" label="Valor:" />
                  </div>
                </fieldset>
                <Button type="submit">Salvar</Button>
              </form>
            </FormProvider>
          </PopoverModular>
        </DialogTrigger>
      </div>
      <BotaoModular css="rollBtn" cor="transparente" font="tormenta20Font">
        <img src="./icons/d20 cinza.svg" alt="rolagem" />
        <p>{atributo.valorAtual}</p>
      </BotaoModular>
    </div>
  )
}
