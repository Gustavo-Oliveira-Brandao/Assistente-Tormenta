import { IDeslocamento } from '@renderer/@types/T20 GOTY/IDeslocamento'

export const atualizarDeslocamento = async (
  id: number,
  deslocamento: IDeslocamento
): Promise<void> => {
  await window.api.deslocamentos.putDeslocamento(id, deslocamento)
}
