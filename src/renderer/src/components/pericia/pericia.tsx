import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { JSX, useState } from 'react'
import styles from './pericia.module.scss'
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
import { RollBtn } from '../roll-btn/roll-btn'

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
      <div className={`${styles.card}`}>
        <DialogTrigger isOpen={edicaoEstaAberta} onOpenChange={setEdicaoEstaAberta}>
          <Button className={`${styles.titulo} inter`}>
            <p className={styles.nome}>
              {pericia.nome}
              {pericia.requerTreinamento ? '*' : ''}
            </p>
            <p className={styles.subtexto}>
              {pericia.sofrePenalidadeArmadura ? 'Penalidade de armadura' : ''}
            </p>
          </Button>
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
                  </SelectFieldModular>
                  <SwitchFieldModular
                    name="sofrePenalidadeArmadura"
                    label="Penalidade de armadura?"
                  />
                </FieldsetModular>
                <FieldsetModular legend="Valores">
                  <NumberFieldModular name="bonus" label="Bônus" css="start" placeholder="0" />
                </FieldsetModular>
                <FieldsetModular legend="Treinamento">
                  <SwitchFieldModular name="ehTreinado" label="É treinado?" />
                  <SwitchFieldModular name="requerTreinamento" label="Requer treinamento?" />
                </FieldsetModular>
                <Button type="submit">Salvar</Button>
              </form>
            </FormProvider>
          </ModalModular>
        </DialogTrigger>
        <div className={styles.rolagem}>
          {exibeTreinamento && (
            <p className={styles.treinamento + ' inter'}>
              {pericia.ehTreinado ? 'Treinado' : 'Destreinado'}
            </p>
          )}
          <RollBtn valor={pericia.valorAtual} />
        </div>
      </div>
    </>
  )
}
