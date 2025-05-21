import { IRecurso } from '@renderer/@types/T20 GOTY/IRecurso'

export const atualizarRecurso = async (recurso: IRecurso): Promise<void> => {
  await window.api.recurso.putRecurso(recurso)
}
