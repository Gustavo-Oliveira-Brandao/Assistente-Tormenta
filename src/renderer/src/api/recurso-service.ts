import { IRecurso } from '@renderer/@types/T20 GOTY/IStatus'

export const atualizarRecurso = async (recurso: IRecurso): Promise<void> => {
  await window.api.recursos.putRecurso(recurso)
}
