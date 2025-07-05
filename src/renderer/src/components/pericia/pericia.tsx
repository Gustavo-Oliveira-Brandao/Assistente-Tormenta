import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { JSX, useState } from 'react'
import styles from './pericia.module.scss'
import { BotaoModular } from '../botao-modular/botao-modular'
import { Button, DialogTrigger } from 'react-aria-components'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { periciaSchema } from '@renderer/validators/schemas/pericia'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarPericia } from '@renderer/hooks/mutations/usePericiaMutation'
import { FieldsetModular } from '../fieldset/fieldset'
import { OptionModular, SelectFieldModular } from '../select-field/select-field'
import { opcoesTreinamento } from '@renderer/utils/select options/opcoesTreinamento'
import { opcoesAtributos } from '@renderer/utils/select options/opcoesAtributos'
import { SwitchFieldModular } from '../switch-field/switch-field'
import { ModalModular } from '../modal/modal'
import { PopoverModular } from '../popover/popover'

type periciaProps = {
  pericia: IPericia
  exibeTreinamento: boolean
}

export const Pericia = ({ pericia, exibeTreinamento }: periciaProps): JSX.Element => {
  const methods = useForm<z.infer<typeof periciaSchema>>({
    defaultValues: {
      ...pericia
    },
    resolver: zodResolver(periciaSchema)
  })

  const [edicaoEstaAberta, setEdicaoEstaAberta] = useState(false)

  const atualizarPericia = useAtualizarPericia()

  const onSubmit = (data): void => {
    console.log(data)
    const novaPericia: IPericia = {
      ...pericia,
      ...data
    }

    atualizarPericia.mutate(novaPericia)
    setEdicaoEstaAberta(false)
  }

  return (
    <>
      <div className={styles.card}>
        <DialogTrigger isOpen={edicaoEstaAberta} onOpenChange={setEdicaoEstaAberta}>
          <BotaoModular css="botaoTimido" cor="transparente" font="tormenta20Font">
            <p>{pericia.nome}</p>
          </BotaoModular>
          <PopoverModular
            placement="bottom"
            width='fit-content'
          >
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FieldsetModular legend={pericia.nome}>
                  <SelectFieldModular label="Atributo" name="atributo">
                    {opcoesAtributos.map((opt) => (
                      <OptionModular key={opt.value} name={opt.value} value={opt.text} />
                    ))}
                  </SelectFieldModular>
                  <SelectFieldModular label="Grau de treinamento" name="treinamento">
                    {opcoesTreinamento.map((opt) => (
                      <OptionModular key={opt.value} value={opt.text} name={opt.value} />
                    ))}
                  </SelectFieldModular>
                </FieldsetModular>
                <Button type="submit">Salvar</Button>
              </form>
            </FormProvider>
          </PopoverModular>
        </DialogTrigger>
        <div className={styles.rolagem}>
          {exibeTreinamento && (
            <p className={styles.treinamento + ' tormenta20Font'}>{pericia.treinamento}</p>
          )}
          <BotaoModular css="rollBtn" font="tormenta20Font" cor="transparente">
            <img src="./icons/d20 cinza.svg" alt="rolagem" />
            <p>{pericia.valorAtual}</p>
          </BotaoModular>
        </div>
      </div>
    </>
  )
}
