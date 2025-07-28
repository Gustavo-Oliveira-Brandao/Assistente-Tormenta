import { JSX } from 'react'
import styles from './sidebar-ficha.module.scss'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { FotoPersonagem } from '@renderer/components/foto-personagem/foto-personagem'
import { BarraRecurso } from '@renderer/components/barra-recurso/barra-recurso'
import { Button, DialogTrigger } from 'react-aria-components'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { statusSchema } from '@renderer/validators/schemas/status'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarStatus } from '@renderer/hooks/mutations/useStatusMutation'
import { IStatus } from '@renderer/@types/T20 GOTY/IStatus'
import { NumberFieldModular } from '@renderer/components/number-field/number-field'
import { FieldsetModular } from '@renderer/components/fieldset/fieldset'
import { PopoverModular } from '@renderer/components/popover/popover'

type SidebarFichaProps = {
  personagem: IPersonagem
}

export const SidebarFicha = ({ personagem }: SidebarFichaProps): JSX.Element => {
  const atualizarStatus = useAtualizarStatus()

  const methodsStatus = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
    defaultValues: statusSchema.parse(personagem.status)
  })

  const onSubmitStatus = (data): void => {
    const novoStatus: IStatus = { ...personagem.status, ...data }
    atualizarStatus.mutate({ id: personagem.status.id, status: novoStatus })
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.personagemInfo}>
        <FotoPersonagem personagem={personagem} />
        <div className={styles.personagemChamada}>
          <div className={styles.personagemNome}>
            <p className={`tormenta20Font`}>{personagem.nome}</p>
          </div>
          <div className={styles.personagemNivel}>
            <img src="./icons/upgrade.svg" alt="nivel" />
            <p className="tormenta20Font">{personagem.nivel}</p>
          </div>
        </div>
        <div className={styles.recursos}>
          <DialogTrigger>
            <BarraRecurso
              categoria="vida"
              valorAtual={personagem.status.vidaAtual}
              valorMaximo={personagem.status.vidaMaxima ?? 0}
              valorTemporario={personagem.status.vidaTemporaria}
            />
            <PopoverModular placement="right" width="fit-content">
              <FormProvider {...methodsStatus}>
                <form onSubmit={methodsStatus.handleSubmit(onSubmitStatus)}>
                  <FieldsetModular legend={'Vida'}>
                    <NumberFieldModular css="" name="vidaAtual" placeholder="0" label="Atual" />
                    <NumberFieldModular css="" name="vidaTemporaria" placeholder="0" label="Temp" />
                  </FieldsetModular>
                  <Button type="submit">Salvar</Button>
                </form>
              </FormProvider>
            </PopoverModular>
          </DialogTrigger>
          <DialogTrigger>
            <BarraRecurso
              categoria="mana"
              valorAtual={personagem.status.manaAtual}
              valorMaximo={personagem.status.manaMaxima ?? 0}
              valorTemporario={personagem.status.manaTemporaria}
            />
            <PopoverModular placement="right" width="fit-content">
              <FormProvider {...methodsStatus}>
                <form onSubmit={methodsStatus.handleSubmit(onSubmitStatus)}>
                  <FieldsetModular legend={'Mana'}>
                    <NumberFieldModular css="" name="manaAtual" placeholder="0" label="Atual" />
                    <NumberFieldModular css="" name="manaTemporaria" placeholder="0" label="Temp" />
                  </FieldsetModular>
                  <Button type="submit">Salvar</Button>
                </form>
              </FormProvider>
            </PopoverModular>
          </DialogTrigger>
        </div>
      </div>
    </aside>
  )
}
