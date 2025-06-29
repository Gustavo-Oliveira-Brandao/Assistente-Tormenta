import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { JSX, useState } from 'react'
import styles from './atributo.module.scss'
import { Dialog, Popover } from '@base-ui-components/react'
import { BotaoModular } from '../botao-modular/botao-modular'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInputModular } from '../input-modular/input-modular'
import { Modal } from '../modal/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarAtributo } from '@renderer/hooks/mutations/useAtributoMutation'
import { atributoSchema } from '@renderer/validators/schemas/atributo'
import { z } from 'zod'
import formStyles from '@renderer/assets/styles/forms.module.scss'
import { PopoverModular } from '../popover/popover'

type AtributoProps = {
  atributo: IAtributo
}
export const Atributo = ({ atributo }: AtributoProps): JSX.Element => {
  const atualizarAtributo = useAtualizarAtributo()
  const methods = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: {
      valorBase: atributo.valorBase,
      bonus: atributo.bonus
    }
  })

  const onSubmit = (data): void => {
    const novoAtributo: IAtributo = {
      ...atributo,
      valorBase: data.valorBase,
      bonus: data.bonus
    }
    atualizarAtributo.mutate(novoAtributo)
  }

  return (
    <div className={styles.atributo} key={atributo.id}>
      <div className={styles.titulo}>
        <Popover.Root>
          <Popover.Trigger className={`${styles.nomeAtributo} tormenta20Font`}>
            {atributo.nome}
          </Popover.Trigger>
          <PopoverModular titulo={atributo.nome}>
            <FormProvider {...methods}>
              <form className={formStyles.form} onChange={methods.handleSubmit(onSubmit)}>
                <fieldset className={formStyles.fieldset}>
                  <div className={formStyles.rowFields}>
                    <FormInputModular
                      type="number"
                      placeholder="0"
                      name="valorBase"
                      label="Valor:"
                    />
                    <FormInputModular type="number" placeholder="0" name="bonus" label="Bônus:" />
                  </div>
                </fieldset>
              </form>
            </FormProvider>
          </PopoverModular>
        </Popover.Root>
      </div>
      <BotaoModular
        css="rollBtn"
        cor="transparente"
        icone="./icons/d20 cinza.svg"
        onClickEvent={() => console.log('teste')}
        font="tormenta20Font"
        texto={atributo.valorAtual}
      />
    </div>
  )
}
