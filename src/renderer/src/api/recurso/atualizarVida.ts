import { Recurso } from '@renderer/@types/t20/Recurso'

export const atualizarVida = async (vida: Recurso): Promise<void> => {
  await window.api.putVida(vida)
}
