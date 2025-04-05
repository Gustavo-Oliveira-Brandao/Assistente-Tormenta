import { IRecurso } from '@renderer/@types/t20/Recurso'

export const atualizarRecurso = async (recurso: IRecurso): Promise<void> => {
  await window.api.putRecurso(recurso)
}
