import { IDeslocamento } from '@renderer/@types/T20 GOTY/IDeslocamento'

export const atualizarDeslocamento = async (deslocamento: IDeslocamento): Promise<void> => {
  await window.api.deslocamento.putDeslocamento(deslocamento)
}
