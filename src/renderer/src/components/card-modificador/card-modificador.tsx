import { IModificador } from '@renderer/@types/T20 GOTY/IModificador'
import { JSX } from 'react'
import { SimpleCard } from '../simple-card/simple-card'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { modificadorSchema } from '@renderer/validators/schemas/modificador'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useAtualizarModificador,
  useDeletarModificador
} from '@renderer/hooks/mutations/useModificadorMutation'

type CardModificadorProps = {
  modificador: IModificador
}

export const CardModificador = ({ modificador }: CardModificadorProps): JSX.Element => {
  const methods = useForm<z.infer<typeof modificadorSchema>>({
    resolver: zodResolver(modificadorSchema),
    defaultValues: modificadorSchema.parse(modificador)
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
  return <SimpleCard css="efeito" width="100%" height="55px"></SimpleCard>
}
