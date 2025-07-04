import { IModificador } from '@renderer/@types/T20 GOTY/IModificador'
import { JSX } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { modificadorSchema } from '@renderer/validators/schemas/modificador'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useAtualizarModificador,
  useDeletarModificador
} from '@renderer/hooks/mutations/useModificadorMutation'
import { AccordionCard } from '../accordion-card/accordion-card'
import { StandaloneSwitch, SwitchFieldModular } from '../switch-field/switch-field'
import { FieldsetModular } from '../fieldset/fieldset'
import { TextFieldModular } from '../text-field/text-field'
import { NumberFieldModular } from '../number-field/number-field'
import { SelectFieldModular } from '../select-field/select-field'
import { opcoesTipoModificadores } from '@renderer/utils/select options/opcoesModificadores'
import { opcoesAtributos } from '@renderer/utils/select options/opcoesAtributos'
import { Button } from 'react-aria-components'

type CardModificadorProps = {
  modificador: IModificador
}

export const CardModificador = ({ modificador }: CardModificadorProps): JSX.Element => {
  const methods = useForm<z.infer<typeof modificadorSchema>>({
    resolver: zodResolver(modificadorSchema),
    defaultValues: { ...modificador }
  })

  const atualizarModificador = useAtualizarModificador()
  const removerModificador = useDeletarModificador()

  const onSubmit = (data): void => {
    const novoModificador: IModificador = {
      ...modificador,
      ...data
    }

    atualizarModificador.mutate(novoModificador)
  }

  const onSubmitAtivo = (novoValor: boolean): void => {
    console.log(novoValor)
    const novoModificador: IModificador = {
      ...modificador,
      estaAtivo: novoValor
    }

    atualizarModificador.mutate(novoModificador)
  }

  return (
    <AccordionCard
      titulo={modificador.nome}
      subtitulo={`${modificador.tipo}: ${modificador.alvo}`}
      header={
        <StandaloneSwitch
          estadoInicial={modificador.estaAtivo}
          name="estaAtivo"
          label="Ativo?"
          onChange={onSubmitAtivo}
        />
      }
      inicialmenteExpandido={false}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FieldsetModular legend={<p>Modificador</p>}>
            <TextFieldModular name="nome" label="Nome" placeholder="Forma selvagem" />
            <NumberFieldModular name="valor" label="Valor" placeholder="0" css="" />
            <SelectFieldModular options={opcoesTipoModificadores} name="tipo" label="Tipo" />
            <SelectFieldModular options={opcoesAtributos} name="alvo" label="Alvo" />
            <SwitchFieldModular name="ehPorNivel" label="P/ nivel?" />
          </FieldsetModular>
          <Button type="submit">Salvar</Button>
        </form>
      </FormProvider>
    </AccordionCard>
  )
}
