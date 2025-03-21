import { IRecurso } from '@renderer/@types/t20/Recurso'

export const atualizarVida = async (vida: IRecurso): Promise<void> => {
  await window.api.putVida(vida)
}
