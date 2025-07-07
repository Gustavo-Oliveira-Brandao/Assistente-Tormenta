import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { JSX, useState } from 'react'
import styles from './atributo.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarAtributo } from '@renderer/hooks/mutations/useAtributoMutation'
import { atributoSchema } from '@renderer/validators/schemas/atributo'
import { z } from 'zod'
import { NumberFieldModular } from '../number-field/number-field'
import { Button, DialogTrigger } from 'react-aria-components'
import { BotaoModular } from '../botao-modular/botao-modular'
import { FieldsetModular } from '../fieldset/fieldset'
import { ModalModular } from '../modal/modal'

type AtributoProps = {
  atributo: IAtributo
}
export const Atributo = ({ atributo }: AtributoProps): JSX.Element => {
  const atualizarAtributo = useAtualizarAtributo()

  const [edicaoEstaAberta, setEdicaoEstaAberta] = useState(false)

  const methodsAtributos = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: {
      valorBase: atributo.valorBase,
      bonus: atributo.bonus
    }
  })

  const onSubmitAtributos = (data): void => {
    const novoAtributo: IAtributo = {
      ...atributo,
      valorBase: data.valorBase,
      bonus: data.bonus
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
          <ModalModular
            titulo={`${atributo.nome}`}
            placement="center"
            height="fit-content"
            width="fit-content"
          >
            <FormProvider {...methodsAtributos}>
              <form onSubmit={methodsAtributos.handleSubmit(onSubmitAtributos)}>
                <FieldsetModular legend={'Valores'}>
                  <NumberFieldModular css="start" name="valorBase" placeholder="0" label="Base:" />
                  <NumberFieldModular css="start" name="bonus" placeholder="0" label="Bônus:" />
                </FieldsetModular>
                <Button type="submit">Salvar</Button>
              </form>
            </FormProvider>
          </ModalModular>
        </DialogTrigger>
      </div>
      <BotaoModular css="rollBtn" cor="transparente" font="tormenta20Font">
        <img src="./icons/d20 cinza.svg" alt="rolagem" />
        <p>{atributo.valorAtual}</p>
      </BotaoModular>
    </div>
  )
}
