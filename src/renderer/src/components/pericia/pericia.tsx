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
import { ModalModular } from '../modal/modal'
import { NumberFieldModular } from '../number-field/number-field'
import { SwitchFieldModular } from '../switch-field/switch-field'
import { TextFieldModular } from '../text-field/text-field'
import { atributosData } from '@renderer/utils/common data/atributosData'
import { grausTreinamentoData } from '@renderer/utils/common data/treinamentosData'

type periciaProps = {
  pericia: IPericia
  exibeTreinamento: boolean
  css: string
}

export const Pericia = ({ pericia, css, exibeTreinamento }: periciaProps): JSX.Element => {
  const methods = useForm<z.infer<typeof periciaSchema>>({
    defaultValues: {
      ...pericia
    },
    resolver: zodResolver(periciaSchema)
  })

  const [edicaoEstaAberta, setEdicaoEstaAberta] = useState(false)

  const atualizarPericia = useAtualizarPericia()

  const onSubmit = (data): void => {
    const novaPericia: IPericia = {
      ...pericia,
      ...data
    }

    console.log(novaPericia)

    atualizarPericia.mutate({ id: pericia.id, pericia: novaPericia })
    setEdicaoEstaAberta(false)
  }

  return (
    <>
      <div className={`${styles.card} ${styles[css]}`}>
        <DialogTrigger isOpen={edicaoEstaAberta} onOpenChange={setEdicaoEstaAberta}>
          <BotaoModular css="botaoTimido" cor="transparente" font="tormenta20Font">
            <p>{pericia.nome}</p>
          </BotaoModular>
          <ModalModular
            placement="center"
            height="fit-content"
            titulo={`${pericia.nome}`}
            width="fit-content"
          >
            <FormProvider {...methods}>
              <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                <FieldsetModular legend={`Detalhes`}>
                  {pericia.categoria == 'oficio' && (
                    <TextFieldModular placeholder="Culinaria" name="nome" label="Nome:" />
                  )}
                  <SelectFieldModular label="Atributo" name="atributo">
                    {atributosData.map((opt) => (
                      <OptionModular key={opt.value} name={opt.value} value={opt.nome} />
                    ))}
                  </SelectFieldModular>{' '}
                  <SwitchFieldModular
                    name="sofrePenalidadeArmadura"
                    label="Penalidade de armadura?"
                  />
                </FieldsetModular>{' '}
                <FieldsetModular legend="Valores">
                  <NumberFieldModular name="bonus" label="Bônus" css="start" placeholder="0" />
                </FieldsetModular>
                <FieldsetModular legend="Treinamento">
                  <SelectFieldModular label="Grau de treinamento" name="treinamento">
                    {grausTreinamentoData.map((opt) => (
                      <OptionModular key={opt.value} value={opt.nome} name={opt.value} />
                    ))}
                  </SelectFieldModular>
                  <SwitchFieldModular name="requerTreinamento" label="Requer treinamento?" />
                </FieldsetModular>
                <Button type="submit">Salvar</Button>
              </form>
            </FormProvider>
          </ModalModular>
        </DialogTrigger>
        <div className={styles.rolagem}>
          {exibeTreinamento && (
            <p className={styles.treinamento + ' tormenta20Font'}>
              {pericia.ehTreinado ? 'Treinado' : 'Destreinado'}
            </p>
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
