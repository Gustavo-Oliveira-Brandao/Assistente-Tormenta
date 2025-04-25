import { ICriatura } from '@renderer/@types/t20/Criatura'
import { opcoesClasses } from '@renderer/utils/select options/opcoesClasses'
import { opcoesDivindades } from '@renderer/utils/select options/opcoesDivindades'
import { opcoesRacas } from '@renderer/utils/select options/opcoesRacas'
import { opcoesTamanhos } from '@renderer/utils/select options/opcoesTamanhos'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import FormGroup from '../form-group/form-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAtualizarPersonagemMutation } from '@renderer/hooks/mutations/personagem/useAtualizarPersonagemMutation'
import { fecharModal } from '@renderer/store/slices/modalSlice'
import { useDispatch } from 'react-redux'
import styles from '@renderer/assets/styles/forms.module.scss'
import { detalhesSchema } from '@renderer/validators/schemas/detalhesSchema'

export const DetalhesForm = ({ personagem }: { personagem: ICriatura }): JSX.Element => {
  const atualizarDetalhesPersonagem = useAtualizarPersonagemMutation()
  const dispatch = useDispatch()

  const methods = useForm<z.infer<typeof detalhesSchema>>({
    resolver: zodResolver(detalhesSchema),
    defaultValues: {
      nome: personagem.nome,
      raca: personagem.raca,
      classe: personagem.classe,
      origem: personagem.origem,
      divindade: personagem.divindade,
      nivel: personagem.nivel,
      experiencia: personagem.experiencia,
      tamanho: personagem.tamanho,
      alinhamento: personagem.alinhamento,
      tipoCriatura: personagem.tipoCriatura
    }
  })

  const onEditDetalhes: SubmitHandler<z.infer<typeof detalhesSchema>> = async (
    data
  ): Promise<void> => {
    const personagemCopy = { ...personagem }
    personagemCopy.nome = data.nome
    personagemCopy.raca = data.raca
    personagemCopy.classe = data.classe
    personagemCopy.origem = data.origem
    personagemCopy.divindade = data.divindade
    personagemCopy.nivel = data.nivel
    personagemCopy.experiencia = data.experiencia
    personagemCopy.alinhamento = data.alinhamento
    personagemCopy.tamanho = data.tamanho
    atualizarDetalhesPersonagem.mutate(personagemCopy)
    dispatch(fecharModal())
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onEditDetalhes)}>
        <fieldset className={styles.fieldset}>
          <legend>Detalhes</legend>
          <div className={styles.rowFields}>
            <FormGroup name="nome" label="nome:" placeholder="Ragnar Montealto" type="text" />
            <FormGroup name="raca" label="raça:" type="dropdown" options={opcoesRacas} />
            <FormGroup name="classe" label="classe:" type="dropdown" options={opcoesClasses} />
            <FormGroup name="origem" label="origem:" placeholder="Taverneiro" type="text" />
            <FormGroup
              name="divindade"
              label="divindade:"
              type="dropdown"
              options={opcoesDivindades}
            />
            <FormGroup name="tamanho" label="tamanho:" type="dropdown" options={opcoesTamanhos} />
            <FormGroup
              name="alinhamento"
              label="alinhamento:"
              type="text"
              placeholder="Neutro e bom"
            />
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>Experiência</legend>
          <div className={styles.rowFields}>
            <FormGroup
              name="nivel"
              label="nivel:"
              placeholder={String(personagem.nivel)}
              type="number"
            />
            <FormGroup
              name="experiencia"
              label="xp:"
              placeholder={String(personagem.experiencia)}
              type="number"
            />
          </div>
        </fieldset>
        {Object.entries(methods.formState.errors).map(([field, error]) => (
          <p className={styles.alert} role="alert" key={field}>
            {error.message}!
          </p>
        ))}
        <input className={styles.submitButton} type="submit" value="Salvar" />
      </form>
    </FormProvider>
  )
}
