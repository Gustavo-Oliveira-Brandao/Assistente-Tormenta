import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const FormularioModular = ({
  onSubmit,
  children
}: {
  onSubmit: () => void
  children: ReactNode
}): JSX.Element => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

export default FormularioModular
